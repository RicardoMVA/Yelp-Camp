import sharp from "sharp";

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
	imageStore
};
