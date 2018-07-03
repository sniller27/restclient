//mongoose makes it easier to communicate with mongodb
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');


//making new mongoose schema
var CustomerSchema = new mongoose.Schema({
	id: Number,
    name: String,
    birthPlace: String,
    birthDate: String,
    favoritebool: String
});

//for auto increment
var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

// entitySchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });
// CustomerSchema.plugin(AutoIncrement, {inc_field: 'id'});

//use the schema for a mongoose model and export it
module.exports = mongoose.model('Customers', CustomerSchema);