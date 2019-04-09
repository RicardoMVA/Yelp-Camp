import Campground from "../models/campgrounds";
import fs from "fs";
import {locateCamp} from "./googlemaps";
import {imageStore} from "./image uploading";


const createCamp = async (req, res) => {
	imageStore(req, res);
	// 'req.file' comes from 'multer', and is the name/path 
	// of the file uploaded through the form in 'new.ejs'
	const imageName = `${req.file.filename}-large.jpg`;
	const fullLocation = await locateCamp(req, res);

	const newCampground = {
		name: req.body.name, 
		image: imageName,
		price: req.body.price,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		},
		...fullLocation
	};

	// create a new campground using 'newCampground'
	Campground.create(newCampground, (err, createdCampground) => {
		if(err){
			req.flash("error", "Could not create the campground");
			console.log(err);
			return res.redirect('back');
		} else {
			req.flash("success", "Campground created successfully");
			console.log(createdCampground);

			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
}


const updateCamp = async (req, res) => {
	let imageName;
	// search campground image name on database
	await Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			req.flash("error", "Could not find the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			imageName = campground.image;
		};
	});

	if (req.file) {
		imageStore(req, res);

		// delete old image from server folder
		fs.unlink(`images/campgrounds/${imageName}`, (err) => {
			if (err) {
				console.log(err);
				imageName = `${req.file.filename}-large.jpg`;
			} else {
				imageName = `${req.file.filename}-large.jpg`;
			}
		});
	}

	const fullLocation = await locateCamp(req, res);

	const updateCampground = {
		name: req.body.name, 
		image: imageName,
		price: req.body.price,
		description: req.body.description,
		...fullLocation
	};

	// find and update the campground edited
	Campground.findByIdAndUpdate(req.params.id, updateCampground, (err, updatedCampground) => {
		if (err) {
			req.flash("error", "Could not update the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground edited successfully");
			// redirect back to show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}


const deleteCamp = async (req, res) => {
	// find campground by id to erase it's image
	await Campground.findById(req.params.id, (err, campground) => {			
		// delete campground image from server folder
		fs.unlink(`images/campgrounds/${campground.image}`, (err) => {
			if(err){
				console.log(err);
			}
		});
	});

	// remove campground from database
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			req.flash("error", "Could not delete the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted successfully");
			res.redirect("/campgrounds");
		}
	});
}


const showAllCamps = (req, res) => {
	// this finds the campgrounds according to the 'search' form
	if (req.query.search) {
		// this avoids possibility of DDoS attack, converts the search
		// string using a regular expression
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');

		// get campgrounds from the database that have a name which 
		// matches 'search'
		Campground.find({name: regex}, (err, allCampgrounds) => {
			if(err){
				req.flash("error", "Could not load the campground database");
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
				req.flash("error", "Could not load the campground database");
				console.log(err);
			} else {
				res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
			}
		});
	}
}


// use this to avoid possible DDoS attacks
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


export {
	createCamp,
	updateCamp,
	deleteCamp,
	showAllCamps
};
