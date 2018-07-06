//sanitizing for security
const sanitizer = require('sanitizer');
//password hashing module/middleware
const bcrypt = require('bcrypt');

//models
const Login = require('../../model/loginmodel.js');


module.exports = (req, res) => {

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

};