const mongoose = require('mongoose');

module.exports = () => { 

	
	const URLmongodb = process.env.database;
	

	//Mongoose Connection
	mongoose.connect(URLmongodb, err => {
		// console.log(err);
	}); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));

	db.once("open", err => {
	  console.log("Connection succeeded.");
	});

	// db.on('disconnected', err => {  
	//   console.log('Mongoose default connection disconnected'); 
	// });

	// db.on('SIGINT', err => {  
	//   console.log('SIGINT'); 
	// });

};