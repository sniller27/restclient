//sanitizing for security
const sanitizer = require('sanitizer');

//models
const Customer = require('../../model/customermodel.js');

module.exports = (req, res) => {

  let {keyword} = req.body;

  //sanitizing
  const sKeyword = sanitizer.escape(keyword);

  //query with mongoose
  var query = Customer.find({'name' : new RegExp(sKeyword, 'i')}).select({"_id": 0, "phone": 1, "email": 2, "name": 3});

  query.exec((err, someValue) => {
      err ? next(err) : res.json(someValue);
  });
  
};