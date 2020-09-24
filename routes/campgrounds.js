var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');

// Requiring Middleware
//Do not need to say index.js in require. It works fine😊
var middleware = require("../middleware");

router.get("/", function(req, res){
	var currentUser = req.user;
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// Adding a post route
router.post("/", middleware.isLoggedIn, function(req, res){
	var name  = req.body.name;
	var img   = req.body.img;
	var price = req.body.price;
	var desc  = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, url: img, description: desc, author: author}
	Campground.create(newCampground, function(err, newCreatedCampground){
		if(err){
			console.log(err);
		}else{
			//Redirect to /campgrounds
			console.log(newCreatedCampground);
			res.redirect("campgrounds");			
		}
	});
});

//New Campground - Form
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//Show route
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// console.log(foundCampground);
			res.render("campgrounds/show", {
				campground : foundCampground
			});			
		}
	}); 
});


//Edit Route
router.get("/:id/edit", middleware.checkAccountOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
		res.render('campgrounds/edit', {campground: 		foundCampground});	
	});
});	
	
//Update Route
router.put("/:id", middleware.checkAccountOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", err);
			console.log(err);
			res.redirect('/campgrounds');
		}else{
			req.flash("success", "Campground updated!!!");
			console.log(req.body.campground);
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Delete Route
router.delete("/:id", middleware.checkAccountOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", err);
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground deleted successfully!!!");
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;