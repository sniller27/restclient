//sanitizing for security
const sanitizer = require('sanitizer');
//for webtokens
const jwt    = require('jsonwebtoken'); 

module.exports = (req, res, next, app) => {

  /**
   * Verifies the validity of a received token
   * @param  {object}   req  express HTTP request param
   * @param  {object}   res  express HTTP response param
   * @param  {Function} next callback argument
   * @param  {object}   app  express app object
   * @return {string}        return json error string or new decoded request value
   */
  
  let tokenVerification = (req, res, next, app) => {

    // verifies secret and checks exp
    jwt.verify(tokenCheck, app.get('superSecret'), (err, decoded) => {
      err ? res.json(false) : next();
    });

  };

  let {token} = req.body;
  
  //sanitizing
  const sToken = sanitizer.escape(token);

  // check header or url parameters or post parameters for token
  const tokenCheck = sToken || req.headers['x-access-token'];

  // decode token
  tokenCheck ? tokenVerification(req, res, next, app) : res.json("You need to login");
  
};