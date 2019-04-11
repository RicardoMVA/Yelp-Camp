import express from "express";
import {
	showCommentForm,
	createComment,
	updateComment,
	deleteComment,
	showEditForm
} from "../src/comments functions";
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
	showCommentForm(req, res);
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
