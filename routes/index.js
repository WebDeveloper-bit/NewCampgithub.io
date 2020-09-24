var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');

// Requiring Middleware
//Do not need to say index.js in require. It works fine😊
var middleware = require("../middleware");


router.get("/", function(req, res){
	res.render("landing");
});

//AUTH ROUTES

//Registering new user
router.get("/register", function(req, res){
	res.render("register");
});

//Handle Sign Up Logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			// We can use req.flash only before res.render() & res.redirect() 
// 	and not before return res.render(), it will not work		
			req.flash("error", err.message);
			console.log(err);
			return res.redirect("register");
		}
		passport.authenticate('local')(req, res, function(){
			console.log(user);
			req.flash("success", "Welcome to Yelpcamp, " + req.body.username);
			res.redirect("/campgrounds");
		});
	});
});

//Login Route
router.get("/login", function(req, res){
	res.render("login");
});

//Handle Login Logic
router.post("/login", passport.authenticate('local', {
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
	}) ,function(req, res){
	req.flash("success" ,"Log in successfully!!!");
});

//Logout Logic
router.get("/logout", function(req, res){
	req.flash("success", "Logged out successfully");
	req.logout();
	res.redirect("/campgrounds");
});

module.exports = router;