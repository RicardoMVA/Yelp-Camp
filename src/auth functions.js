import User from "../models/user";
import passport from "passport";
import async from "async";
import nodemailer from "nodemailer";
import crypto from "crypto";


const registerUser = async (req, res) => {
	// take username from form
	let newUser = new User({
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
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			// this tells the user what was the error. it comes from
			// 'passport-local-mongoose', since we're using the 
			// built-in 'err.message'
			req.flash("error", err.message);
			return res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, () => {
				req.flash("success", "Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
			});
		}
	});
}


const login = async (req, res, next) => {
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
}


const forgotPassword = async (req, res, next) => {
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
}


export {
	registerUser,
	login,
	forgotPassword
}
