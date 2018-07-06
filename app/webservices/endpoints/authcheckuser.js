//sanitizing for security
const sanitizer = require('sanitizer');
//for webtokens
const jwt    = require('jsonwebtoken'); 

module.exports = (req, res, next, app) => {

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
        //return res.json({ success: false, message: 'Failed to authenticate token.' });    
        return res.json("Your session has expired");
      } else {
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    res.json("You need to login");
    
  }
  
};