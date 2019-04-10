import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import async from "async";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {registerUser} from "../src/auth functions";
import Campground from "../models/campgrounds";
import User from "../models/user";


dotenv.config();
const router = express.Router();

// root route
router.get("/", (req, res) => {
	res.render("landing");
});


// ==============
// AUTH ROUTES
// ==============

// show register form
router.get("/register", (req, res) => {
	res.render("register", {page: 'register'});
});


// handle sign up form
router.post("/register", (req, res) => {
	registerUser(req, res);
});


// show login form
router.get("/login", (req, res) => {
	res.render("login", {page: "login"});
});


// handle login form, checks if user exists and password is correct
router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err || !user) {
			req.flash("error", "User doesn't exist or password is incorrect");
			return res.redirect("/login");;
		} else {
			req.logIn(user, (err) => {
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
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});


// =================
// PASS RESET ROUTES
// =================

// forgot password route
router.get("/forgot", (req, res) => {
	res.render("forgot");
});


// forgot password post route
router.post("/forgot", (req, res, next) => {
	// waterfall is an array of functions that are called one
	// after another
	async.waterfall([
		(done) => {
			crypto.randomBytes(20, (err, buf) => {
				// this 'token' is what makes the 'forgot password'
				// email be unique
				const token = buf.toString("hex");
				done(err, token);
			});
		},
		(token, done) => {
			User.findOne({email: req.body.email}, (err, user) => {
				if (!user) {
					req.flash("error", "No account with that email address exists.");
					return res.redirect("/forgot");
				} else {
					user.resetPasswordToken = token;
					// this makes the token expire after a while
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
					user.save((err) => {
						done(err, token, user);
					});
				}
			});
		},
		// this configures and sends the email to change the password
		(token, user, done) => {
			const smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					// go here to allow this to work
					// https://myaccount.google.com/lesssecureapps
					user: "ricardovalenca@gmail.com",
					// this is your email password, inside the '.env' file
					pass: process.env.GMAILPW
				}
			});
			const mailOptions = {
				to: user.email,
				from: "ricardovalenca@gmail.com",
				subject: "YelpCamp Password Reset",
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          			  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
         			  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					  'If you did not request this, please ignore this email and your password will remain unchanged.\n'

			};
			smtpTransport.sendMail(mailOptions, (err) => {
				console.log("change password email sent");
				req.flash("success", "An email has been sent to " + user.email + " with further instructions.");
				done(err, "done");
			});
		}

	], (err) => {
		if (err) {
			return next(err);
		} else {
			res.redirect("/forgot");
		}
	});
});


// checks if token is still valid and if it is render 'reset' page
router.get("/reset/:token", (req, res) => {
	// '$gt' means 'greater than'
	User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
		if (!user) {
			req.flash("error", "Password reset token is invalid or has expired.");
			return res.redirect("/forgot");
		} else {
			res.render("reset", {token: req.params.token});
		}
	});
});


// change password an sends email when successful
router.post("/reset/:token", (req, res) => {
	async.waterfall([
		(done) => {
			User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
				if (!user) {
					req.flash("error", "Password reset token is invalid or has expired.");
					return res.redirect("back");
				}
				if(req.body.password === req.body.confirm) {
					// passport.local.mongoose has this 'setPassword' mehtod
					// that does the password changing by itself (hasing, etc)
					user.setPassword(req.body.password, (err) => {
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;
						user.save((err) => {
							req.logIn(user, (err) => {
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
		(user, done) => {
			const smtpTransport = nodemailer.createTransport({
				service: "Gmail", 
				auth: {
					user: "ricardovalenca@gmail.com",
					pass: process.env.GMAILPW
				}
			});
			const mailOptions = {
				to: user.email,
				from: "ricardovalenca@gmail.com",
				subject: 'Your password has been changed',
				text: 'Hello,\n\n' +
					'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, (err) => {
				req.flash("success", "Success! Your password has been changed.");
				done(err);
			});
		}
	], (err) => {
		res.redirect("/campgrounds");
	});
});


// users profile route
router.get("/users/:id", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {
			console.log(err);
			req.flash("error", "Something went wrong finding the user");
			res.redirect("/");
		} else {
			// this finds all the campgrounds created by the user profile viewed
			Campground.find().where("author.id").equals(foundUser._id).exec((err, campgrounds) => {
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
