import Campground from "../models/campgrounds";
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


export {
	createCamp
};
