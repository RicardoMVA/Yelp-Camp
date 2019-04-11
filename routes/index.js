import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import async from "async";
import nodemailer from "nodemailer";
import {
	registerUser,
	login,
	forgotPassword
} from "../src/auth functions";
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
	login(req, res, next);
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
	forgotPassword(req, res, next);
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
