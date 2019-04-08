import NodeGeocoder from "node-geocoder";
import dotenv from "dotenv";


const geocoderConfig = () => {
	dotenv.config();

	const options = {
	  provider: 'google',
	  httpAdapter: 'https',
	  apiKey: process.env.GEOCODER_API_KEY,
	  formatter: null
	};

	return NodeGeocoder(options);
}


const locateCamp = (req, res) => {
	const geocoder = geocoderConfig();

	// a promise is needed since 'geocoder' response is async
	return new Promise((resolve, reject) => {
		// code for checking and storing geocode location
		// this is using nodegeocoder
		geocoder.geocode(req.body.location, (err, data) => {
		    if (err || !data.length) {
		    	req.flash('error', 'Address not found');
		    	console.log(err);
		    	reject(res.redirect('back'));
		    } else {
		    	resolve({
		    		lat: data[0].latitude,
		    		lng: data[0].longitude,
		    		location: data[0].formattedAddress
		    	});
		    }
		});
	})
}

export {
	locateCamp
}
