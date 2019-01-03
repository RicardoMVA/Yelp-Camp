var express    = require("express"),
	// 'mergeParams' is used to take 'params' from other sources
	// fixes the 'req.params' returning 'null'
	router 	   = express.Router({mergeParams: true}),
	Campground = require("../models/campgrounds"),
	Comment    = require("../models/comments"),
	// when you require a folder, if there is a file called
	// "index.js" inside of it, it will be loaded automatically
	// that's what we're doing here
	middleware = require("../middleware");


// ===================
// COMMENTS ROUTES
// ===================


// NEW - shows form to add comment, if logged in
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log("Something went wrong when finding the ID to write a new comment");
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});


// CREATE - insert comment in specific campground, if logged in
router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log("Something went wrong when adding a new comment");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// take what was sent through the form and add to database
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Something went wrong when adding the comment");
					console.log(err);
				} else {
					// 'req.user' takes information from the user 
					// currently logged in
					// add current user id to comment
					comment.author.id = req.user._id;
					// add current username to comment
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// insert comment on campground
					campground.comments.push(comment);
					// save campground
					campground.save();
					
					req.flash("success", "New comment addded successfully");
					console.log(comment);
					// redirect to current campground page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// EDIT - show form to edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	// this check is necessary so that the edit page can't be 
	// corrupted with an invalid campground id
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err || !foundCampground){
			req.flash("error", "Cannot find the campground");
			return res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if (err) {
					console.log(err);
					res.redirect("back");
				} else {
					// 'req.params.id' finds the current campground id
					// 'foundComment' has the 'req.params.comment_id' information
					res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
				}
			});
		}
	});
});


// update edited comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment edited successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// DESTROY/DELETE comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
		if (err) {
			console.log(err);
			req.flash("error", "Something went wrong when deleting the comment");
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


module.exports = router;