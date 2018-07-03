var mongoose = require('mongoose');

module.exports = function () { 

	//Mlab
	var URLmongodb = process.env.database;

	//MongoDB Atlas
	// var URLmongodb = 'mongodb+srv://<holg></holg>er:123@cluster0-qem4n.mongodb.net/test?retryWrites=true';

	//Mongoose Connection
	mongoose.connect(URLmongodb); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));

	db.once("open", function (callback) {
	  console.log("Connection succeeded.");
	});

	// db.once("open", callback => {
	// 	console.log(success);
	// });

};