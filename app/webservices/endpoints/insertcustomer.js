//sanitizing for security
const sanitizer = require('sanitizer');

//models
const Customer = require('../../model/customermodel.js');

module.exports = (req, res) => {

	let {name, email, phone} = req.body;

      //sanitizing
      const sName = sanitizer.escape(name);
      const sEmail = sanitizer.escape(email);
      const sPhone = sanitizer.escape(phone);

    if(typeof JSON.stringify(sName) === "undefined" || typeof JSON.stringify(sEmail) === "undefined" || typeof JSON.stringify(sPhone) === "undefined"){
      
      res.json("All values must be entered");
      
    }else {

      const newCustomer = new Customer({
        name: sName,
        email: sEmail,
        phone: sPhone,
      });

      //Mongoose Save Funtktion to save data
      newCustomer.save(error => {
        if (error) {
          console.error(error);
          res.json("error");
        }else {
          res.json("Customer added");
        }

      });
    }
  
};