import express from "express";
import {
	showAllCamps,
	createCamp,
	showEditCamp,
	updateCamp,
	deleteCamp,
	showCampDetails
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
	showEditCamp(req, res);
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
	showCampDetails(req, res);
});


// this is used to pass the routes back to the app.js file
module.exports = router;
