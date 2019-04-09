import express from "express";
import Campground from "../models/campgrounds";
import Comment from "../models/comments";
import {
	createComment,
	updateComment,
	deleteComment
} from "../controller/comments functions";
import {checkCommentOwnership, checkLogin} from "../middleware/index";


// 'mergeParams' is used to take 'params' from other sources
// fixes the 'req.params' returning 'null'
const router = express.Router({mergeParams: true});

// ===================
// COMMENTS ROUTES
// ===================


// NEW - shows form to add comment, if logged in
router.get("/new", checkLogin, (req, res) => {
	// find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log("Something went wrong when finding the ID to write a new comment");
			console.log(err);
		} else {
			res.render("comments/new", {campground});
		}
	})
});


// CREATE - insert comment in specific campground, if logged in
router.post("/", checkLogin, (req, res) => {
	createComment(req, res);
});


// EDIT - show form to edit comment
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
	// this check is necessary so that the edit page can't be 
	// corrupted with an invalid campground id
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err || !foundCampground){
			req.flash("error", "Cannot find the campground");
			return res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, (err, foundComment) => {
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


router.put("/:comment_id", checkCommentOwnership, (req, res) => {
	updateComment(req, res);
});


// DESTROY/DELETE comment
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
	deleteComment(req, res);
});


module.exports = router;
