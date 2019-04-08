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
			req.flash("error", "Something went wrong when creating the campground");
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
			console.log(err);
			req.flash("error", err.message);
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
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground edited successfully");
			// redirect back to show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}


export {
	createCamp,
	updateCamp
};
