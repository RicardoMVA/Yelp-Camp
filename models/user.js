import mongoose, {Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const UserSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	picture: String,
	email: {type: String, unique: true, required: true},
	password: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	isAdmin: {type: Boolean, default: false}
});


// this takes the passportLocalMongoose and adds it's methods to
// the schema, in this case UserSchema. used for authentication
UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);
