//mongoose makes it easier to communicate with mongodb
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

//making new mongoose schema
const LoginSchema = new mongoose.Schema({
	// id: Number,
    username: String,
    password: String,
});

const entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

//use the schema for a mongoose model and export it
module.exports = mongoose.model('Users', LoginSchema);