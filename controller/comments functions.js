import Campground from "../models/campgrounds";
import Comment from "../models/comments";


const createComment = (req, res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			req.flash("error", "Could not find the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			const newComment = {
				author: {
					// 'req.user' takes information from the user 
					// currently logged in
					id: req.user._id,
					username: req.user.username
				},
				text: req.body.text
			}

			// take what was sent through the form and add to database
			Comment.create(newComment, (err, comment) => {
				if (err) {
					req.flash("error", "Could not add the comment");
					console.log(err);
				} else {
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


const showEditForm = (req, res) => {
	// this check is necessary so that the edit page can't be 
	// corrupted with an invalid campground id
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err || !foundCampground){
			req.flash("error", "Could not find the campground");
			console.log(err);
			return res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, (err, foundComment) => {
				if (err) {
					req.flash("error", "Could not find the comment");
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


const updateComment = (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			req.flash("error", "Could not update the comment");
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment edited successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}


const deleteComment = (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
		if (err) {
			req.flash("error", "Could not delete the comment");
			console.log(err);
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
