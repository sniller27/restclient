//sanitizing for security
const sanitizer = require('sanitizer');
//password hashing module/middleware
const bcrypt = require('bcrypt');
//for webtokens
const jwt    = require('jsonwebtoken'); 

//models
const Login = require('../../model/loginmodel.js');

module.exports = (req, res, app) => {

  /**
   * Checks the user password by using bcrypt algorithm
   * @param  {string} password received user password
   * @param  {string} user     data for found user in database
   * @return {function/string}          returns functions that creates a new token or error message
   */
  
  let checkUserPassword = (password, user) => {

    //sanitizing
    const sPassword = sanitizer.escape(password);

    bcrypt.compare(sPassword, user.password, (err, valid) => {

      valid ? createNewToken() : res.json("Wrong username and password");

    });   

  };

  /**
   * Creates a new toekn with payload, privleges, expiration time
   * @return {string} return a json string with the token
   */
  
  let createNewToken = () => {

    // create a token
    const payload = {
      admin: true 
    };

    const token = jwt.sign(payload, app.get('superSecret'), {
      expiresIn: 300
    });

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });

  };

  /**
   * Authenticates the user by looking for at match for received username
   * @param  {string} username received username
   * @param  {string} password received password
   * @return {string}          returns function with token is user exists or an error string
   */
  
  let authenticateUser = (username, password) => {

    const sUsername = sanitizer.escape(username);

    Login.findOne({'username' : sUsername}, (err, user) => {
    
      user ? checkUserPassword(password, user) : res.json("Username doesn't exist");

    });

  };

  let {username, password} = req.body;

  typeof username == "string" 
  && typeof password == "string" 
  && username.length > 0
  && password.length > 0
  ? authenticateUser(username, password) : res.json("Missing username and password");  

}