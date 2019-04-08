import express from "express";
import fs from "fs";
import Campground from "../models/campgrounds";
import {createCamp, updateCamp} from "../controller/functions";
import {uploadConfig} from "../controller/image uploading";
import {checkCampgroundOwnership, checkLogin} from "../middleware/index";


const router = express.Router();


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
// 'uploadConfig().single("image")' is taking the 'image' in 
// the form inside the 'new.ejs' campgrounds page
router.post("/", checkLogin, uploadConfig().single("image"), (req, res) => {
	createCamp(req, res);
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
// 'uploadConfig.single("image")' is taking the 'image' in the 
// form inside the 'edit.ejs' campgrounds page
router.put("/:id", checkCampgroundOwnership, uploadConfig().single("image"), (req, res) => {
	updateCamp(req, res);
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
