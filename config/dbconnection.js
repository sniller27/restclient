var mongoose = require('mongoose');

module.exports = function () { 

	
	var URLmongodb = process.env.database;
	

	//Mongoose Connection
	mongoose.connect(URLmongodb, function(err){
		// console.log(err);
	}); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));

	db.once("open", function (callback) {
	  console.log("Connection succeeded.");
	});

	db.on('disconnected', function () {  
	  console.log('Mongoose default connection disconnected'); 
	});

	db.on('SIGINT', function () {  
	  console.log('SIGINT'); 
	});

	// db.once("open", callback => {
	// 	console.log(success);
	// });

};