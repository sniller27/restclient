var path = require('path');
//sanitizing for security
var sanitizer = require('sanitizer');
//for webtokens
var jwt    = require('jsonwebtoken'); 
//password hashing module/middleware
var bcrypt = require('bcrypt');
//models
var Customer = require('../model/customermodel.js');
var Login = require('../model/loginmodel.js');


module.exports = function (app) {

  app.set('superSecret', process.env.tokensecret);

  //REGISTER NEW USER
  app.post('/api/register', function(req, res){

    //sanitizing
    var sUsername = sanitizer.escape(req.body.username);
    var sPassword = sanitizer.escape(req.body.password);

    //set salt and generate hash
    const saltRounds = 10;

    bcrypt.hash(sPassword, saltRounds, function(err, hash) {
      
      var newUser = new Login({
        // id: 4,
        username: sUsername,
        password: hash,
        
      });

      //Mongoose Save Function to save data
      newUser.save(function(error) {
        if (error) {
          console.error(error);
          res.json("error");
        }else {
          res.json("User registered");
        }
      });

    });

  });

  //INSERT NEW ARTIST (POST)
  app.post('/api/authenticate', function(req, res){

    //sanitizing
    var sUsername = sanitizer.escape(req.body.username);

    Login.findOne({'username' : sUsername}, function(err, user) {
      console.log("inside");
      console.log(user);
      if (err) throw err;

      if(user){

        //sanitizing
        var sPassword = sanitizer.escape(req.body.password);

        bcrypt.compare(sPassword, user.password, function(err, valid) {

          if (valid) {
          
          // create a token
          var payload = {
            admin: true 
          };

          var token = jwt.sign(payload, app.get('superSecret'), {
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

    // res.json("post");
  });

  //route middleware to authenticate and check token
  app.use(function(req, res, next) {

  //sanitizing
  var sToken = sanitizer.escape(req.body.token);

  // check header or url parameters or post parameters for token
  var token = sToken || req.headers['x-access-token'];

  // decode token
  if (token) {
    console.log("token exists");
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        // console.log(err);
        //return res.json({ success: false, message: 'Failed to authenticate token.' });    
        return res.json("Your session has expired");
      } else {
        console.log("all good");
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error

    // return res.status(403).send({ 
    //   success: false, 
    //   message: 'No token provided.'
    // });

    res.json("You need to login");
    
  }
  
});

  //ENTRY-POINT (INDEX-PAGE)
  // app.get('/', function(req, res){
  //   res.sendFile(path.join(__dirname, '../', 'index.html'));
  // });

  //READ ALL ARTISTS (GET)
  app.get('/api/artists', function(req, res){
    
    //sanitizing
    var sKeyword = sanitizer.escape(req.body.keyword);

  // var nameparameter = req.query.name;
  // var nameparametersanitized = sanitizer.escape(nameparameter);
    Customer.find({'name' : new RegExp(sKeyword, 'i')}, function(err, users) {
      if (err) throw err;

      res.json(users);
    });
  
  // res.json("lol1");

  });

  //INSERT CUSTOMER
  app.post('/api/artist', function(req, res){

    //sanitizing
    var sName = sanitizer.escape(req.body.name);
    var sEmail = sanitizer.escape(req.body.email);
    var sPhone = sanitizer.escape(req.body.phone);

    var newCustomer = new Customer({
      // id: 4,
      name: sName,
      email: sEmail,
      phone: sPhone,
      
    });
    //Mongoose Save Funtktion to save data
    newCustomer.save(function(error) {
      if (error) {
        console.error(error);
        res.json("error");
      }else {
        res.json("Customer added");
      }
    });

  });


 /**
 * NULLIFY WEB TOKEN (LOG OUT)
 */

  app.post('/api/deauthenticate', function(req, res){

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: null
        });

    // res.json("post");

  });

};