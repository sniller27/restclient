//sanitizing for security
const sanitizer = require('sanitizer');
//password hashing module/middleware
const bcrypt = require('bcrypt');

//models
const Login = require('../../model/loginmodel.js');


module.exports = (req, res) => {

  /**
   * Functions
   */
  let insertNewUser = (sUsername, sPassword) => {
    
    //set salt and generate hash
    const saltRounds = 10;

      bcrypt.hash(sPassword, saltRounds, (err, hash) => {
        
        const newUser = new Login({
          username: sUsername,
          password: hash,
        });

        //Mongoose Save Function to save data
        newUser.save(error => {

          error ? res.json("error") : res.json("User registered");
          
        });

      });
  };
  
  let insertUserCheck = (username, password) => {

      //sanitizing
    const sUsername = sanitizer.escape(username);
    const sPassword = sanitizer.escape(password);

    Login.findOne({'username' : sUsername}, (err, user) => {
      
      if (err) throw err;

      user ? res.json("Username is already taken") : insertNewUser(sUsername, sPassword);

    });

  };


  let {username, password} = req.body;

    typeof username == "string" 
    && typeof password == "string" 
    && username.length > 0
    && password.length > 0
    ? insertUserCheck(username, password) : res.json("All values must be entered");

};