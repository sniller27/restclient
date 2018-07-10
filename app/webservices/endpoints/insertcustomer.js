//sanitizing for security
const sanitizer = require('sanitizer');
const strings = require('../../strings/strings.js');

//models
const Customer = require('../../model/customermodel.js');

module.exports = (req, res) => {

  /**
   * Sanitizes received data and inserts new customer
   * @param  {string} name  received name
   * @param  {string} email received email
   * @param  {string} phone received phone number
   * @return {string}       return as json string
   */
  
  let insertCustomerCheck = (name, email, phone) => {

    //sanitizing
    const sName = sanitizer.escape(name);
    const sEmail = sanitizer.escape(email);
    const sPhone = sanitizer.escape(phone);

    const newCustomer = new Customer({
      name: sName,
      email: sEmail,
      phone: sPhone,
    });

    //Mongoose Save Funtktion to save data
    newCustomer.save(error => {

      error ? res.json(strings.feedback.errormessage) : res.json(strings.feedback.customeradded);

    });

  };

  let {name, email, phone} = req.body;

  typeof name == "string" 
  && typeof email == "string" 
  && typeof phone == "string" 
  && name.length > 0
  && email.length > 0
  && phone.length > 0
  ? insertCustomerCheck(name, email, phone) : res.json(strings.feedback.enterallvalues);
  
};