import Campground from "../models/campgrounds";
import User from "../models/user";
import passport from "passport";
import nodemailer from "nodemailer";
import crypto from "crypto";


const registerUser = (req, res) => {
	// take username from form
	let newUser = new User({
		username: req.body.username, 
		picture: req.body.picture,
		email: req.body.email
	});

	// checks if user inputted the correct adminCode, and if it did
	// turns him/her into an admin
	if (req.body.adminCode === "secretcode") {
		newUser.isAdmin = true;
	}

	// takes 'newUser' info and password to register each in the
	// DB (username, picture, email, password hash)
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash("error", "Could not register user");
			console.log(err);
			return res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, () => {
				req.flash("success", `Welcome to YelpCamp ${user.username}`);
				res.redirect("/campgrounds");
			});
		}
	});
}


const login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err || !user) {
			req.flash("error", "User doesn't exist or password is incorrect");
			return res.redirect("/login");;
		} else {
			req.logIn(user, (err) => {
				if (err) {
					req.flash("error", "Could not log in");
					console.log(err);
					res.redirect("/login");
					return next(err);
				} else {
					req.flash("success", `Welcome back, ${user.username}`);
					return res.redirect("/campgrounds");
				}
			})
		}
	}) (req, res, next);
}


const logout = (req, res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
}


const forgotPassword = async (req, res) => {
	let token
	await crypto.randomBytes(20, (err, buf) => {
		if (err) {
			req.flash("error", "Could not generate validation token");
			console.log(err);
		} else {
			// this 'token' is what makes the 'forgot password'
			// email be unique
			token = buf.toString("hex");
		}
	});

	let foundUser
	await User.findOne({email: req.body.email}, (err, user) => {
		if (err){
			req.flash("error", "Could not access database");
			console.log(err);
		} else if (!user) {
			req.flash("error", "No account with that email address exists.");
		} else {
			user.resetPasswordToken = token;
			// this makes the token expire after a while
			user.resetPasswordExpires = Date.now() + 180000; // 30 min
			user.save();
			foundUser = user;
		}
	});

	try {
		const mailOptions = {
			to: foundUser.email,
			from: "ricardovalenca@gmail.com",
			subject: "YelpCamp Password Reset",
			text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
	  			  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
	 			  `http://${req.headers.host}/reset/${token}\n\n` +
				  `If you did not request this, please ignore this email and your password will remain unchanged.\n`

		};

		// this configures and sends the email to change the password
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

		smtpTransport.sendMail(mailOptions, (err) => {
			if (err) {
				req.flash("error", "Could not send email");
				console.log(err);
			} else {
				req.flash("success", `An email has been sent to ${foundUser.email} with further instructions.`);
				console.log(`Email sent to user ID: ${foundUser._id}`);
				res.redirect("/forgot");
			}
		});
	} catch (err) {
		console.log(`Could not complete the process to retrieve the password`);
		res.redirect("/forgot");
	}
}


const checkTokenAndRender = (req, res) => {
	// '$gt' means 'greater than'
	User.findOne(
		{resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, 
		(err, user) => {

		if (!user) {
			req.flash("error", "Password reset token is invalid or has expired.");
			return res.redirect("/forgot");
		} else {
			res.render("reset", {token: req.params.token});
		}
	});
}


const resetPassword = async (req, res) => {
	let foundUser
	await User.findOne(
		{resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}},
		(err, user) => {
		
		if (!user) {
			req.flash("error", "Password reset token is invalid or has expired.");
		}

		if(req.body.password === req.body.confirm) {
			foundUser = user;
			// passport.local.mongoose has this 'setPassword' mehtod
			// that does the password changing by itself (hasing, etc)
			user.setPassword(req.body.password, (err) => {
				user.resetPasswordToken = undefined;
				user.resetPasswordExpires = undefined;
				user.save((err) => {
					req.logIn(user, (err) => {
						console.log(`Password changed for user ID: ${user._id}`)
					});
				});
			})
		} else {
			req.flash("error", "Passwords do not match.");
		}
	});

	try {
		const mailOptions = {
			to: foundUser.email,
			from: "ricardovalenca@gmail.com",
			subject: "Your password has been changed",
			text: "Hello,\n\n" +
				`This is a confirmation that the password for your account ${foundUser.email} has just been changed.\n`
		};

		const smtpTransport = nodemailer.createTransport({
			service: "Gmail", 
			auth: {
				user: "ricardovalenca@gmail.com",
				pass: process.env.GMAILPW
			}
		});

		smtpTransport.sendMail(mailOptions, (err) => {
			if (err) {
				console.log(err);
			} else {
				req.flash("success", "Success! Your password has been changed.");
				res.redirect("/campgrounds");
			}
		});
	} catch (err) {
		console.log(`Could not complete the process to reset the password`);
		res.redirect("back");
	}
}


const showUserProfile = (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {
			req.flash("error", "Could not find the user");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// this finds all the campgrounds created by the user profile viewed
			Campground.find().where("author.id").equals(foundUser._id).exec((err, campgrounds) => {
				if (err) {
					console.log(err);
				} else {
					res.render("users/show", {user: foundUser, campgrounds: campgrounds});
				}
			});
		}
	});
}


export {
	registerUser,
	login,
	logout,
	forgotPassword,
	checkTokenAndRender,
	resetPassword,
	showUserProfile
}
