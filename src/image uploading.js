import multer from "multer";
import sharp from "sharp";


// FILE UPLOADING MANAGEMENT
const uploadConfig = () => {
	// using multer to define filename
	const storage = multer.diskStorage({
		filename: (req, file, callback) => {
			callback(null, Date.now() + file.originalname);
		}
	});
	return multer({storage, fileFilter: imageFilter});
}


const imageFilter = (req, file, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return callback(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"), false);
	} else {
		callback(null, true);
	}
};


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
	uploadConfig,
	imageStore
};
