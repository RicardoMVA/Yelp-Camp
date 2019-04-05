import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import Campground from "../models/campgrounds";
import {createCamp} from "../controller/functions";
import {locateCamp} from "../controller/googlemaps";
import {checkCampgroundOwnership, checkLogin} from "../middleware/index";

dotenv.config();
const router = express.Router();

// FILE UPLOADING MANAGEMENT
// using multer to define filename and block non-image files
const storage = multer.diskStorage({
	// this determines what the filename will be
	filename: (req, file, callback) => {
		callback(null, Date.now() + file.originalname);
	}
});

const imageFilter = (req, file, cb) => {
	// this makes it so that only image files are accepted
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return cb(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"), false);
	} else {
		cb(null, true);
	}
};

// this passes the 'storage' and 'imageFilter' variables
const upload = multer({storage, fileFilter: imageFilter});


// ===================
// CAMPGROUNDS ROUTES
// ===================


// INDEX - show all campgrounds or searched ones
router.get("/", (req, res) => {
	// this finds the campgrounds according to the 'search' form
	if (req.query.search) {
		// this avoids possibility of DDoS attack, converts the search
		// string into a regular expression
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');

		// get campgrounds from the database that have a name which 
		// matches 'search'
		Campground.find({name: regex}, (err, allCampgrounds) => {
			if(err){
				console.log("Error loading the database");
				console.log(err);
			} else {
				// this checks if no campground was found
				if (allCampgrounds.length < 1){
					req.flash("error", "No campgrounds match that query, please try again");
					res.redirect("campgrounds/index");
				} else {
					res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
				}
			}
		});
	} else {
		// get all campgrounds from the database
		Campground.find({}, (err, allCampgrounds) => {
			if(err){
				console.log("Error loading the database");
				console.log(err);
			} else {
				res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
			}
		});
	}
});


// NEW - show form to create new campground, if logged in
router.get("/new", checkLogin, (req, res) => {
	res.render("campgrounds/new");
});


// CREATE - adds new campground in DB with image, if logged in
// 'upload.single("image")' is taking the 'image' in the form inside 
// the 'new.ejs' campgrounds page
router.post("/", checkLogin, upload.single("image"), (req, res) => {
	// 'req.file.path' comes from 'multer', and is the name of the
	// file uploaded through the form in 'new.ejs'
	// here we optimize the image using 'sharp', by taking the uploaded 
	// image and passing it through this method
	sharp(req.file.path).jpeg({quality: 80}).resize(1200).toFile("images/campgrounds/" + req.file.filename + "-large.jpg", (err, imageOpt) => {
		if (err) {
			req.flash("error", "Could not optimize image file");
			console.log(err);
			return res.redirect("back");
		} else {
			locateCamp(req, res, req.body.location);
		}
	});
});


// EDIT campground route, if user logged is the same as author
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
	// find the campground to edit, by id
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
			req.flash("error", "Address not found");
			res.redirect("back");
		} else {
			// show edit form
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});	
});


// UPDATE campground route, if user logged is the same as author
// 'upload.single("image")' is taking the 'image' in the form inside 
// the 'edit.ejs' campgrounds page
router.put("/:id", checkCampgroundOwnership, upload.single("image"), (req, res) => {
	// this runs if no image is sent to update
	if (!req.file) {
		// code for checking and storing geocode location
		// this is using nodegeocoder
		geocoder.geocode(req.body.location, (err, data) => {
		    if (err || !data.length) {
		      req.flash('error', err);
		      console.log(err);
		      return res.redirect('back');
		    }
		    req.body.campground.lat = data[0].latitude;
		    req.body.campground.lng = data[0].longitude;
		    req.body.campground.location = data[0].formattedAddress;


			// find and update the campground edited
			Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
				if (err) {
					console.log(err);
					req.flash("error", err.message);
					res.redirect("/campgrounds");
				} else {
					req.flash("success", "Campground edited successfully");
					// redirect back to show page
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		});
	// this runs when user sends a new image
	} else {
		// 'req.file.path' comes from 'multer', and is the name of the
		// file uploaded through the form in 'edit.ejs'
		// here we optimize the image using 'sharp', by taking the uploaded 
		// image and passing it through this method
		sharp(req.file.path).jpeg({quality: 80}).resize(2400).toFile("images/campgrounds/" + req.file.filename + "-large.jpg", (err, imageOpt) => {
			if (err) {
				req.flash("error", "Could not load and optimize image file");
				console.log(err);
				return res.redirect("back");
			} else {
				// select campground image on database
				Campground.findById(req.params.id, (err, campground) => {
					
					// delete old image from server folder
					fs.unlink("images/campgrounds/" + campground.image, (err) => {
						// if no image is found, simply report the error
						// and move on
						console.log(err);

						console.log("images/campgrounds/" + campground.image + " was deleted");

						// define new image name for database
						req.body.campground.image = req.file.filename + "-large.jpg";
						
						// code for checking and storing geocode location
						// this is using nodegeocoder
						geocoder.geocode(req.body.location, (err, data) => {
						    if (err || !data.length) {
						    	req.flash('error', err);
						    	console.log(err);
						    	return res.redirect('back');
						    }
						    req.body.campground.lat = data[0].latitude;
						    req.body.campground.lng = data[0].longitude;
						    req.body.campground.location = data[0].formattedAddress;


							// find and update the campground edited
							Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
								if (err) {
									console.log(err);
									req.flash("error", err.message);
									res.redirect("/campgrounds");
								} else {
									req.flash("success", "Campground edited successfully");
									// redirect back to show page
									res.redirect("/campgrounds/" + req.params.id);
								}
							});
						});
					});
				});
			}
		});
	}
});


// DELETE/DESTROY campground route, if user logged is the same as author
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
	// find campground by id to erase it's image
	Campground.findById(req.params.id, (err, campground) => {			
		// delete campground image from server folder
		fs.unlink("images/campgrounds/" + campground.image, (err) => {
			// if no image is found, simply report the error
			// and move on
			console.log(err);
			console.log("images/campgrounds/" + campground.image + " was deleted");

			// remove campground from database
			Campground.findByIdAndRemove(req.params.id, (err) => {
				if (err) {
					console.log(err);
					req.flash("error", "Something went wrong when deleting the campground");
					res.redirect("/campgrounds");
				} else {
					req.flash("success", "Campground deleted successfully");
					res.redirect("/campgrounds");
				}
			});
		});
	});
});


// SHOW - show detailed info on selected campground
router.get("/:id", (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		// this 'or' statement handles scenarios where the database
		// doesn't returns an error, but also doesn't returns a
		// valid entry (like 'null')
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			console.log(err);
			res.redirect("back");
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


// use this to avoid possible DDoS attacks
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// this is used to pass the routes back to the app.js file
module.exports = router;
