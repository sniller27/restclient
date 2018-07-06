const path = require('path');
//sanitizing for security
const sanitizer = require('sanitizer');
//for webtokens
const jwt    = require('jsonwebtoken'); 
//password hashing module/middleware
const bcrypt = require('bcrypt');
//models
const Customer = require('../model/customermodel.js');
const Login = require('../model/loginmodel.js');

module.exports = app => {

  app.set('superSecret', process.env.tokensecret);

  /**
   * INSERT NEW USER
   */
  
  app.post('/api/register', (req, res) => {

    let {username, password} = req.body;

    //sanitizing
    const sUsername = sanitizer.escape(username);
    const sPassword = sanitizer.escape(password);


    if(typeof JSON.stringify(sUsername) === "undefined" || typeof JSON.stringify(sPassword) === "undefined"){
      
      res.json("All values must be entered");

    }else {
      Login.findOne({'username' : sUsername}, (err, user) => {
      
      if (err) throw err;

      if(user){

        res.json("Username is already taken");

      }else {

        //set salt and generate hash
        const saltRounds = 10;

        bcrypt.hash(sPassword, saltRounds, (err, hash) => {
          
          const newUser = new Login({
            username: sUsername,
            password: hash,
          });

          //Mongoose Save Function to save data
          newUser.save(error => {
            if (error) {
              console.error(error);
              res.json("error");
            }else {
              res.json("User registered");
            }
          });

        });
      }

    });
    }
    
    

  });

  /**
   * AUTHENTICATION
   */
  
  app.post('/api/authenticate', (req, res) => {

    let {username, password} = req.body;

    //sanitizing
    const sUsername = sanitizer.escape(username);

    Login.findOne({'username' : sUsername}, (err, user) => {
      
      if (err) throw err;

      if(user){

        //sanitizing
        const sPassword = sanitizer.escape(password);

        bcrypt.compare(sPassword, user.password, (err, valid) => {

          if (valid) {
          
          // create a token
          const payload = {
            admin: true 
          };

          const token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 30
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
          
          } else {
            res.json("nope");
          }

        });

      }else {
        res.json("meh");
      }

    });

  });

  //route middleware to authenticate and check token
  app.use((req, res, next) => {

    let {token} = req.body;

    //sanitizing
    const sToken = sanitizer.escape(token);

    // check header or url parameters or post parameters for token
    const tokenCheck = sToken || req.headers['x-access-token'];

    // decode token
    if (tokenCheck) {

      // verifies secret and checks exp
      jwt.verify(tokenCheck, app.get('superSecret'), (err, decoded) => {      
        if (err) {
          // console.log(err);
          //return res.json({ success: false, message: 'Failed to authenticate token.' });    
          return res.json("Your session has expired");
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;  
          next();
        }
      });

    } else {

      res.json("You need to login");
      
    }
  
  });

  /**
   * GET CUSTOMERS
   */
  
  app.get('/api/customers', (req, res) => {
    
    let {keyword} = req.body;

    //sanitizing
    const sKeyword = sanitizer.escape(keyword);

    //query with mongoose
    var query = Customer.find({'name' : new RegExp(sKeyword, 'i')}).select({"_id": 0, "phone": 1, "email": 2, "name": 3});

    query.exec((err, someValue) => {
        if (err) return next(err);
        res.json(someValue);
    });

  });

  /**
   * INSERT CUSTOMER
   */
  
  app.post('/api/customer', (req, res) => {

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

   

  });

 /**
 * NULLIFY WEB TOKEN (LOG OUT/DEAUTHENTICATION)
 */

  app.post('/api/deauthenticate', (req, res) => {

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: null
        });

  });

};