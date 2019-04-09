import express from "express";
import Campground from "../models/campgrounds";
import Comment from "../models/comments";
import {
	createComment,
	updateComment,
	deleteComment,
	showEditForm
} from "../controller/comments functions";
import {
	checkCommentOwnership,
	checkLogin
} from "../middleware/index";


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
			console.log("Could not find the campground to write a new comment");
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
	showEditForm(req, res);
});


router.put("/:comment_id", checkCommentOwnership, (req, res) => {
	updateComment(req, res);
});


// DESTROY/DELETE comment
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
	deleteComment(req, res);
});


module.exports = router;
