import User from "../models/user";
import passport from "passport";


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


export {
	registerUser,
	login
}
