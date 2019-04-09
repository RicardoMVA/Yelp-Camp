import Campground from "../models/campgrounds";
import Comment from "../models/comments";


const createComment = async (req, res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log("Something went wrong when adding a new comment");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// take what was sent through the form and add to database
			Comment.create(req.body.comment, (err, comment) => {
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
					comment.save();
					// insert comment on campground
					campground.comments.push(comment);
					campground.save();
					
					req.flash("success", "New comment addded successfully");
					console.log(comment);
					// redirect to current campground page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
}


const showEditForm = async (req, res) => {
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
}


const updateComment = async (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment edited successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}


const deleteComment = async (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
		if (err) {
			console.log(err);
			req.flash("error", "Something went wrong when deleting the comment");
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}


export {
	createComment,
	updateComment,
	deleteComment,
	showEditForm
}
