var mongoose   = require('mongoose'),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest", 
        url: "https://tse1.mm.bing.net/th?id=OIP.jrwU-gHETXJUz1GclxGKBwHaEU&pid=Api&rs=1&c=1&qlt=95&h=270&w=270",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        url: "https://tse1.mm.bing.net/th?id=OIP.q2CwWp32xvcd9k6z_MyRdwHaFG&pid=Api&rs=1&c=1&qlt=95&w=270&h=270",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        url: "https://tse1.mm.bing.net/th?id=OIP.v69lichHDRdEcnnRA95IOwHaDt&pid=Api&rs=1&c=1&qlt=95&w=270&h=270",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
	Campground.remove({}, function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 	console.log("All campgrounds removed successfully");
	// 		// Add new campgrounds
	// data.forEach(function(singleCampground){
	// 	Campground.create(singleCampground, function(err, newCampground){
	// 		if(err){
	// 			console.log(err);
	// 		}else{
	// 			console.log("Created a new campground!");
				
	// 			//Add new comments
	// 			Comment.create({
	// 				text: "Lol!!!",
	// 				author: "Roma"
	// 			}, function(err, newComment){
	// 				if(err){
	// 					console.log(err);
	// 				}else{
	// 					newCampground.comments.push(newComment);
	// 					newCampground.save();
	// 					console.log("I have added a new comment...");
	// 				}
	// 			})
	// 		}
	// 	});		
	// });				
	// 	}
	});
}

module.exports = seedDB;