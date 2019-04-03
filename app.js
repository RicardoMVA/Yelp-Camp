// external modules
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import methodOverride from "method-override";
import flash from "connect-flash";
import moment from "moment";

// internal modules
import Campground from "./models/campgrounds";
import Comment from "./models/comments";
import User from "./models/user";

// routes files
import commentRoutes from "./routes/comments";
import campgroundRoutes from "./routes/campgrounds";
import indexRoutes from "./routes/index";


// ===================
// CONFIGURATION
// ===================
dotenv.config();

const app = express();

// Mongoose config:
// Deprecation fixes done as suggested in the docs
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// create and use database on mlab or locally
const url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url, {useNewUrlParser:true});

// use to pass variables info from/to page body
app.use(bodyParser.urlencoded({extended: true}));

// use to dismiss writing '.ejs' at the end of file names
app.set("view engine", "ejs");

// allow for 'put' and 'delete' HTML methods
app.use(methodOverride("_method"));

// use this to load custom css and JS files
// '__dirname' makes sure to take whatever path the 'app.js' file
// is in, so this makes sure the 'public' folder will be loaded
app.use(express.static(__dirname + "/public"));


// use this to be able to open local image files
// in this case, the images are stored in 'images' folder
app.use("/images", express.static(__dirname + "/images"));


// this uses 'connect-flash', which is useful to display
// login/out messages, etc
app.use(flash());


// this allows using moment with the variable name "moment"
app.locals.moment = moment;


// ======================
// PASSPORT CONFIGURATION
// ======================

app.use(expressSession({
	secret: "Once again, Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

// this starts passport
app.use(passport.initialize());

// this sets up the session
app.use(passport.session());

// creates a new auth strategy called 'local' using the
// 'authenticate()' method that is stored inside 'User'
// courtesy of the 'passportLocalMongoose' extension
passport.use(new LocalStrategy(User.authenticate()));

// this encodes the user session
// 'User.serializeUser()' is actually a function automatically
// added by 'passportLocalMongoose' in the 'User' DB, so we're
// sending this function here to 'passport'
passport.serializeUser(User.serializeUser());

// this decodes the user session
// 'User.deserializeUser()' is actually a function automatically
// added by 'passportLocalMongoose' in the 'User' DB, so we're
// sending this function here to 'passport'
passport.deserializeUser(User.deserializeUser());


// this passes info in every single route, so all of them
// will have access to those parameters
app.use((req, res, next) => {
	// this makes 'currentUser' return the current user logged in. 
	// if there isn't any, it will return 'undefined'
	res.locals.currentUser = req.user;
	// this returns the 'error' message from 'flash' lib whenever
	// 'error' is called in any route
	res.locals.error = req.flash("error");
	// this returns the 'success' message from 'flash' lib whenever
	// 'success' is called in any route
	res.locals.success = req.flash("success");
	next();
});


// set up to use routes files
app.use(indexRoutes);
// note that '/campgrounds' is being applied to all 
// 'campgroundRoutes' here. do this to shorten your routes
app.use("/campgrounds", campgroundRoutes);
// same here, to shorten routes
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, () => {
	console.log("YelpCamp server started!");
});
