var express         = require('express'),
	app             = express(),
	bodyParser      = require('body-parser'),
	mongoose        = require('mongoose'),
	passport     	= require('passport'),
	flash           = require('connect-flash'),  
	localStrategy	= require('passport-local'),
	methodOverride  = require('method-override'),
	Campground      = require("./models/campground"),
	Comment         = require("./models/comment"),
	User            = require("./models/user"),
	seedDB          = require("./seeds");
	// seedDB(); //Seed the database

var campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes    = require('./routes/comments'),
	indexRoutes      = require('./routes/index');

console.log(process.env.DATABASEURL);

// // mongoose.connect("mongodb://localhost:49.35.112.102/32/yelp_camp_v11",{
// // 	useNewUrlParser: true,
// // 	useUnifiedTopology: true
// // 	})
// // 	.then(() => console.log('Connected to DB!'))
// // 	.catch(error => console.log(error.message));
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Prashant12345:Prashant415@cluster0.obvip.mongodb.net/Yelpcamp?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect("mongodb+srv://Mongodbuser:Prashant415@cluster0.obvip.mongodb.net/<dbname>?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useUnifiedTopology: true
	})
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));

//Configuring Auth
app.use(require('express-session')({
	secret: "Adding auth to yelpcamp v6",
	resave: false,
	saveUninitialized: false
}));



app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Adding currentUser to all templates
app.use(function(req, res, next){
	res.locals.error   = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.currentUser = req.user;
	next();
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));


app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Yelpcamp_V11 is serving....");
});
	
