import express from "express";
import passport from "passport";
import {
	registerUser,
	login,
	forgotPassword,
	resetPassword,
	showUserProfile
} from "../src/auth functions";
import User from "../models/user";


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
	resetPassword(req, res);
});


// users profile route
router.get("/users/:id", (req, res) => {
	showUserProfile(req, res);
});


module.exports = router;
