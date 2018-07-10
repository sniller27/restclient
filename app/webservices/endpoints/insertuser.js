//sanitizing for security
const sanitizer = require('sanitizer');
//password hashing module/middleware
const bcrypt = require('bcrypt');

const strings = require('../../strings/strings.js');

//models
const Login = require('../../model/loginmodel.js');


module.exports = (req, res) => {

  /**
   * Uses bcrypt algorithm to turn received password into a hash and inserts/saves new user with recevied data
   * @param  {string} sUsername received username sanitized
   * @param  {string} sPassword received password sanitized
   * @return {string}           return error or success json string
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

          error ? res.json(strings.feedback.errormesssage) : res.json(strings.feedback.userregister);
          
        });

      });
  };
  
  /**
   * Checks if received username already exists before inserting/saving new user
   * @param  {string} username received username
   * @param  {string} password received password
   * @return {string/function}          return json string error or function that inserts/saves new user
   */
  
  let insertUserCheck = (username, password) => {

      //sanitizing
    const sUsername = sanitizer.escape(username);
    const sPassword = sanitizer.escape(password);

    Login.findOne({'username' : sUsername}, (err, user) => {
      
      if (err) throw err;

      user ? res.json(strings.feedback.usernametaken) : insertNewUser(sUsername, sPassword);

    });

  };

  let {username, password} = req.body;

    typeof username == "string" 
    && typeof password == "string" 
    && username.length > 0
    && password.length > 0
    ? insertUserCheck(username, password) : res.json(strings.feedback.enterallvalues);

};