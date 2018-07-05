//for use of environment variables on localhost
require('dotenv/config');
//express for middleware(static files), POST/GET methods
const express = require('express');
const app = express();
//body parser for encoding and getting POST parameters (and maybe URL's)
const bodyParser = require('body-parser');
//path for static files (core module)
const path = require('path');
//http (core module)
const http = require('http');
//mongoose makes it easier to communicate with mongodb (requires model and schema)
const mongoose = require('mongoose');
//security middleware: https://github.com/helmetjs/helmet
const helmet = require('helmet');
//gzip compression for performance
const compression = require('compression');
//relatively new security header (successor to hpkp)
const expectCt = require('expect-ct');

//artist class
const connectdb = require('./config/dbconnection.js');
const routes = require('./app/webservices/customerservice.js');

//connect to mongodb
connectdb();

/**
    MIDDLEWARE
**/

//gzip compression for performance
app.use(compression());

//helmet for security (does a lot of different things). should be used early in middleware stack.
app.use(helmet());

// security: Sets header "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// security header: hpkp (Public-Key-Pins)
const ninetyDaysInSeconds = 7776000;
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}));

// security header: expect-ct (new successor of hpkp)
app.use(expectCt({ maxAge: 123 }));

// security: CSP header
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


/**
 *  CONFIGURE AND START SERVER
 */

//Must be at the and, first we create our handle functions and than we start the server
const PORT= process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, error => {

  if (error) {
    console.error(error);
  } else {
	console.log("Server listening on: http://localhost:%s", PORT);
  }

});

//routes for API
routes(app);