//API-endpoints
const insertuser = require('./endpoints/insertuser.js');
const authenticateuser = require('./endpoints/authenticateuser.js');
const authcheckuser = require('./endpoints/authcheckuser.js');
const getcustomers = require('./endpoints/getcustomers.js');
const insertcustomer = require('./endpoints/insertcustomer.js');
const deauthenticateuser = require('./endpoints/deauthenticateuser.js');

module.exports = app => {

  app.set('superSecret', process.env.tokensecret);

  /**
   * INSERT NEW USER
   */
  
  app.post('/api/register', (req, res) => {

    insertuser(req, res);
    
  });

  /**
   * AUTHENTICATION
   */
  
  app.post('/api/authenticate', (req, res) => {

    authenticateuser(req, res, app);

  });

  //route middleware to authenticate and check token
  app.use((req, res, next) => {

    authcheckuser(req, res, next, app);
  
  });

  /**
   * GET CUSTOMERS
   */
  
  app.get('/api/customers', (req, res) => {
    
    getcustomers(req, res);

  });

  /**
   * INSERT CUSTOMER
   */
  
  app.post('/api/customer', (req, res) => {

    insertcustomer(req, res);

  });

 /**
 * DEAUTHENTICATE USER (NULLIFY WEB TOKEN)
 */

  app.post('/api/deauthenticate', (req, res) => {

    deauthenticateuser(req, res);

  });

};