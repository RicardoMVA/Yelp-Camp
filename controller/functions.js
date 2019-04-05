import Campground from "../models/campgrounds";


const createCamp = (req, res, campInfo) => {
	// create a new campground using 'campInfo' and saving 
	// to 'Campground' database
	Campground.create(campInfo, (err, createdCampground) => {
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
