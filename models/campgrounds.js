import mongoose, {Schema} from "mongoose";

// schema setup for database manipulation
// this tells mongoose that we want to be able to insert these
// objects in the database, with the corresponding types
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	price: String,
	createdAt: {type: Date, default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// this makes the variable 'Campground' able to be used to modify 
// our database (add, delete, modify) using the 'campgroundSchema'
// the "Campground" inside model() is actually the name (singular) 
// of the database. it will automagically be converted into 
// the plural "Campgrounds" and be created in mongoDB
module.exports = mongoose.model("Campground", campgroundSchema);
