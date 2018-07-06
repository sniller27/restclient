const mongoose = require('mongoose');

module.exports = () => { 
	
	const URLmongodb = process.env.database;

	//Mongoose Connection
	mongoose.connect(URLmongodb, err => {
		// console.log(err);
	});

	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));

	db.once("open", err => {
	  console.log("Connection succeeded.");
	});

};