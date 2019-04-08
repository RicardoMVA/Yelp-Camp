import Campground from "../models/campgrounds";
import {locateCamp} from "./googlemaps";
import sharp from "sharp";


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


const imageStore = async (req, res) => {
	// here we optimize the image using 'sharp', by taking the uploaded 
	// image, compressing and resizing it
	sharp(req.file.path)
	.jpeg({quality: 80})
	.resize(1200)
	.toFile(`images/campgrounds/${req.file.filename}-large.jpg`, 
	(err) => {
		if (err) {
			req.flash("error", "Could not store image file");
			console.log(err);
			return res.redirect("back");
		}
	});
}


export {
	createCamp,
	imageStore
};
