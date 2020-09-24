var express = require('express');
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// Requiring Middleware
//Do not need to say index.js in require. It works fine😊
var middleware = require("../middleware");

//Comment Form
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, findCampground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: findCampground});
		}
	})
});
//Comment Post Route
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//Create a comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					//Add username & ID to comment
					comment.author.username =  req.user.username;
					comment.author.id =  req.user._id;
					//Save a comment
					comment.save();
					//console.log(req.body.comment);
					foundCampground.comments.push(comment);
					console.log(req.body.comment);
					foundCampground.save();
					// campgrounds/:id
					res.redirect('/campgrounds/' + foundCampground.id);
					}
			})
		}
	});
});


//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",
				   {
						campground_id: req.params.id,
						comment: foundComment
					});
				}
		});
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

module.exports = router;