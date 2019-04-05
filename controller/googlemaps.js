import {createCamp} from "./functions";
import NodeGeocoder from "node-geocoder";
import dotenv from "dotenv";


dotenv.config();

// GOOGLE GEOCODER
const options = {
  provider: 'google',
  httpAdapter: 'https',
  // this is populated with the API key inside the '.env' file
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);


const locateCamp = (req, res, location) => {
	// code for checking and storing geocode location
	// this is using nodegeocoder
	geocoder.geocode(location, (err, data) => {
	    if (err || !data.length) {
	    	req.flash('error', 'Address not found');
	    	console.log(err);
	    	return res.redirect('back');
	    } else {
		    const lat = data[0].latitude;
		    const lng = data[0].longitude;
		    const location = data[0].formattedAddress;
		    const author = {
				id: req.user._id,
				username: req.user.username
			};
			// takes all variables above and put them togheter in an object
			// also get data from form and add to campgrounds array
			const newCampground = {
				name: req.body.name, 
				image: req.file.filename + "-large.jpg",
				price: req.body.price,
				description: req.body.description,
				author,
				location,
				lat,
				lng
			};
			createCamp(req, res, newCampground);
	    }
	});
}

export {
	locateCamp
}
