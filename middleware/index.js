var Campground = require("../models/campground");
var Comment    = require("../models/comment");


// Middleware goes here
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log(err);
				req.flash("error", "Comment not Found");
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
				 	next();  
				 }else{
					req.flash("error", "You don't have the permission to access it."); 
					res.redirect("back"); 
				 }
			}
		})
	}else{
		req.flash("error" ,"You need to login first");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		// Flash message
		req.flash("error", "You need to do login, in order to do that!");
		res.redirect("/login");
	}
}

//CAMPGROUND OWNERSHIP
middlewareObj.checkAccountOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
						req.flash("error", "You don't have the permission to access it.");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "You need to login first !!!")
		res.redirect("back");
	}
}

module.exports = middlewareObj;