var express    = require("express"),
	router     = express.Router(),
	passport   = require("passport"),
	User 	   = require("../models/user"),
	Campground = require("../models/campgrounds"),
	// npm install async
	async	   = require("async"),
	// npm install nodemailer
	nodemailer = require("nodemailer"),
	// crypto is already baked in node
	crypto	   = require("crypto");


// root route
router.get("/", function(req, res){
	res.render("landing");
});


// ==============
// AUTH ROUTES
// ==============

// show register form
router.get("/register", function(req, res){
	res.render("register", {page: 'register'});
});


// handle sign up form
router.post("/register", function(req, res){
	// take username from form
	var newUser = new User({
		username: req.body.username, 
		picture: req.body.picture,
		email: req.body.email
	});

	// checks if user inputted the correct adminCode, and if it did
	// turns him/her into an admin. note that this code doesn't runs
	// if the condition is false
	if (req.body.adminCode === 'secretcode') {
		newUser.isAdmin = true;
	}

	// takes 'newUser' info and password to register each in the
	// DB (username, picture, email, password hash)
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			// this tells the user what was the error. it comes from
			// 'passport-local-mongoose', since we're using the 
			// built-in 'err.message'
			req.flash("error", err.message);
			return res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
			});
		}
	});
});


// show login form
router.get("/login", function(req, res){
	res.render("login", {page: "login"});
});


// handle login form, checks if user exists and password is correct
router.post("/login", function(req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		if (err || !user) {
			req.flash("error", "User doesn't exist or password is incorrect");
			return res.redirect("/login");;
		} else {
			req.logIn(user, function(err){
				if (err) {
					console.log(err);
					req.flash("error", err);
					res.redirect("/login");
					return next(err);
				} else {
					req.flash("success", "Welcome back, " + user.username);
					return res.redirect("/campgrounds");
				}
			})
		}
	}) (req, res, next);
});


// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});


// =================
// PASS RESET ROUTES
// =================

// forgot password route
router.get("/forgot", function(req, res) {
	res.render("forgot");
});


// forgot password post route
router.post("/forgot", function(req, res, next){
	// waterfall is an array of functions that are called one
	// after another
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				// this 'token' is what makes the 'forgot password'
				// email be unique
				var token = buf.toString("hex");
				done(err, token);
			});
		},
		function(token, done){
			User.findOne({email: req.body.email}, function(err, user){
				if (!user) {
					req.flash("error", "No account with that email address exists.");
					return res.redirect("/forgot");
				} else {
					user.resetPasswordToken = token;
					// this makes the token expire after a while
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
					user.save(function(err){
						done(err, token, user);
					});
				}
			});
		},
		// this configures and sends the email to change the password
		function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					// go here to allow this to work
					// https://myaccount.google.com/lesssecureapps
					user: "ricardovalenca@gmail.com",
					// this is your email password, inside the '.env' file
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
				from: "ricardovalenca@gmail.com",
				subject: "YelpCamp Password Reset",
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          			  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
         			  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					  'If you did not request this, please ignore this email and your password will remain unchanged.\n'

			};
			smtpTransport.sendMail(mailOptions, function(err) {
				console.log("change password email sent");
				req.flash("success", "An email has been sent to " + user.email + " with further instructions.");
				done(err, "done");
			});
		}

	], function(err) {
		if (err) {
			return next(err);
		} else {
			res.redirect("/forgot");
		}
	});
});


// checks if token is still valid and if it is render 'reset' page
router.get("/reset/:token", function(req, res) {
	// '$gt' means 'greater than'
	User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
		if (!user) {
			req.flash("error", "Password reset token is invalid or has expired.");
			return res.redirect("/forgot");
		} else {
			res.render("reset", {token: req.params.token});
		}
	});
});


// change password an sends email when successful
router.post("/reset/:token", function(req, res) {
	async.waterfall([
		function(done) {
			User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user) {
				if (!user) {
					req.flash("error", "Password reset token is invalid or has expired.");
					return res.redirect("back");
				}
				if(req.body.password === req.body.confirm) {
					// passport.local.mongoose has this 'setPassword' mehtod
					// that does the password changing by itself (hasing, etc)
					user.setPassword(req.body.password, function(err) {
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;
						user.save(function(err) {
							req.logIn(user, function(err) {
								done(err, user);
							});
						});
					})
				} else {
					req.flash("error", "Passwords do not match.");
					return res.redirect('back');
				}
			});
		},
		function(user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: "Gmail", 
				auth: {
					user: "ricardovalenca@gmail.com",
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
				from: "ricardovalenca@gmail.com",
				subject: 'Your password has been changed',
				text: 'Hello,\n\n' +
					'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				req.flash("success", "Success! Your password has been changed.");
				done(err);
			});
		}
	], function(err) {
		res.redirect("/campgrounds");
	});
});


// users profile route
router.get("/users/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if (err) {
			console.log(err);
			req.flash("error", "Something went wrong finding the user");
			res.redirect("/");
		} else {
			// this finds all the campgrounds created by the user profile viewed
			Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
				if (err) {
					console.log(err);
					req.flash("error", "Something went wrong finding the campgrounds created by this user");
				} else {
					res.render("users/show", {user: foundUser, campgrounds: campgrounds});
				}
			});
		}
	})
});


module.exports = router;