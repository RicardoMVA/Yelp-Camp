import express from "express";
import Campground from "../models/campgrounds";
import {
	createCamp,
	updateCamp,
	deleteCamp,
	showAllCamps
} from "../src/campgrounds functions";
import {uploadConfig} from "../src/image uploading";
import {
	checkCampgroundOwnership,
	checkLogin
} from "../middleware/index";


const router = express.Router();


// ===================
// CAMPGROUNDS ROUTES
// ===================


// INDEX - show all campgrounds or searched ones
router.get("/", (req, res) => {
	showAllCamps(req, res);
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
			req.flash("error", "Could not find the campground");
			console.log(err);
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
	deleteCamp(req, res);
});


// SHOW - show detailed info on selected campground
router.get("/:id", (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		// this 'or' statement handles scenarios where the database
		// doesn't returns an error, but also doesn't returns a
		// valid entry (like 'null')
		if(err || !foundCampground){
			req.flash("error", "Could not find the campground");
			console.log(err);
			res.redirect("back");
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


// this is used to pass the routes back to the app.js file
module.exports = router;
