//sanitizing for security
const sanitizer = require('sanitizer');
//password hashing module/middleware
const bcrypt = require('bcrypt');
//for webtokens
const jwt    = require('jsonwebtoken'); 

//models
const Login = require('../../model/loginmodel.js');

module.exports = (req, res, app) => {

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
            expiresIn: 300
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
          
          } else {
            res.json("Wrong username and password");
          }

        });

      }else {
        res.json("Wrong username and password");
      }

    });

}