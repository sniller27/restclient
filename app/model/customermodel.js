//mongoose makes it easier to communicate with mongodb
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence');

//making new mongoose schema
const CustomerSchema = new mongoose.Schema({
	id: Number,
    name: String,
    email: String,
    phone: String,
});

//for auto increment
const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const counter = mongoose.model('counter', CounterSchema);

const entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

//use the schema for a mongoose model and export it
module.exports = mongoose.model('Customers', CustomerSchema);