var path = require('path');
var sanitizer = require('sanitizer');
var jwt    = require('jsonwebtoken'); 


var Customer = require('../model/customermodel.js');
var Login = require('../model/loginmodel.js');




module.exports = function (app) {

  app.set('superSecret', process.env.tokensecret);

  //REGISTER NEW USER
  app.post('/api/register', function(req, res){

    var newUser = new Login({
      // id: 4,
      username: req.body.username,
      password: req.body.password,
      
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

    //res.json("Customer added");

  });

  //INSERT NEW ARTIST (POST)
  app.post('/api/authenticate', function(req, res){

  console.log("auteht");

    Login.findOne({'username' : req.body.username}, function(err, user) {
      console.log("inside");
      console.log(user);
      if (err) throw err;

      if(user){

        if (user.password == req.body.password) {
          
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

      }else {
        res.json("meh");
      }

    });

    // res.json("post");
  });

  //route middleware to authenticate and check token
  app.use(function(req, res, next) {

    console.log("TOEKN");

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.headers['x-access-token'];

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
    console.log(req.body.keyword);

  // var nameparameter = req.query.name;
  // var nameparametersanitized = sanitizer.escape(nameparameter);
    Customer.find({'name' : new RegExp(req.body.keyword, 'i')}, function(err, users) {
      if (err) throw err;

      res.json(users);
    });
  
  // res.json("lol1");

  });

  //READ SPECIFIC ARTISTS (GET)
  app.get('/api/artist', function(req, res){
  // var nameparameter = req.query.name;
  // // console.log(nameparameter);
  // var nameparametersanitized = sanitizer.escape(nameparameter);
  //   Artist.find({'name' : new RegExp(nameparametersanitized, 'i')}, function(err, users) {
  //     if (err) throw err;

  //     res.json(users);
  //   });
  
  res.json("lol2");

  });

  //INSERT NEW ARTIST (POST)
  app.post('/api/artist', function(req, res){

    // res.send(req.body);
  console.log("inside post artist");
    // //sanitizing
    // var sanitizename = sanitizer.escape(req.body.name);
    // var sanitizebplace = sanitizer.escape(req.body.birthPlace);

    var newCustomer = new Customer({
      // id: 4,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      
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

    //res.json("Customer added");

  });

  //UPDATE ARTIST (PUT)
  app.put('/api/artist', function(req, res){

    // res.send(req.body);
    // var artistid = req.body.selectedid;

    // Artist.update({'id': artistid}, {
    //     favoritebool: req.body.afavorite
    // }, function(err, numberAffected, rawResponse) {
    //    //handle it
    // });

    res.json("put");

  });

  //DELETE ARTIST
  app.delete('/api/artist', function(req, res){

    // res.send(req.body);
    // var delid = req.body.selectedid;

    //  //Mongoose Save Funtktion to save data
    // Artist.findOneAndRemove({id : delid}, function(error) {
    //   if (error) {
    //     console.error(error);
    //   }
    // });
    

    res.json("delete");

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