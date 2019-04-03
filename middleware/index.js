import Campground from "../models/campgrounds";
import Comment from "../models/comments";


const checkCampgroundOwnership = (req, res, next) => {
	// check if user is logged in
	if (req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground) => {
			// this 'or' statement handles scenarios where the database
			// doesn't returns an error, but also doesn't returns a
			// valid entry (like 'null')
			if (err || !foundCampground) {
				console.log(err);
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// check if user is the same as the campground author
				// 'equals()' is a mongoose built-in method, since we can't
				// directly compare 'foundCampground.author.id' and
				// 'req.user._id', since the latter is a string and
				// the former is a mongoose object, so different types
				if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
					// user logged in is the same, so we move on
					next();
				} else {
					req.flash("error", "You need to be the campground author to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}


const checkCommentOwnership = (req, res, next) => {
	// check if user is logged in
	if (req.isAuthenticated()){
		// find the comment by id
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			// this 'or' statement handles scenarios where the database
			// doesn't returns an error, but also doesn't returns a
			// valid entry (like 'null')
			if (err || !foundComment) {
				console.log(err);
				req.flash("error", "Comment not found");
				// this takes the user back to the last page visited
				res.redirect("back");
			} else {
				// check if user is the same as the comment author
				// 'equals()' is a mongoose built-in method, since we can't
				// directly compare 'foundComment.author.id' and
				// 'req.user._id', since the latter is a string and
				// the former is a mongoose object, so different types
				if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
					// user logged in is the same, so we move on
					next();
				} else {
					req.flash("error", "You need to be the comment author to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}


const checkLogin = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	// this passes the 'flash' message, so if the user isn't
	// authenticated, this message will show up
	// note that req.flash should always happen before the redirect
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}


export {
	checkCampgroundOwnership,
	checkCommentOwnership,
	checkLogin
}
