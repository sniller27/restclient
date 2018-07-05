//for use of environment variables on localhost
require('dotenv/config');
//express for middleware(static files), POST/GET methods
var express = require('express');
var app = express();
//body parser for encoding and getting POST parameters (and maybe URL's)
var bodyParser = require('body-parser');
//path for static files (core module)
var path = require('path');
//http (core module)
var http = require('http');
//mongoose makes it easier to communicate with mongodb (requires model and schema)
var mongoose = require('mongoose');
//security middleware: https://github.com/helmetjs/helmet
var helmet = require('helmet');
//gzip compression for performance
var compression = require('compression');
//relatively new security header (successor to hpkp)
var expectCt = require('expect-ct');

//artist class
var connectdb = require('./config/dbconnection.js');
var routes = require('./app/webservices/customerservice.js');

//connect to mongodb
connectdb();

/**
    USED MIDDLEWARE
**/
//gzip compression for performance
app.use(compression());

//helmet for security (does a lot of different things). should be used early in middleware stack.
app.use(helmet());

// security: Sets header "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// security header: hpkp (Public-Key-Pins)
var ninetyDaysInSeconds = 7776000;
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}));

// security header: new successor of hpkp
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
var server = http.createServer(app);

server.listen(PORT, error => {

  if (error) {
    console.error(error);
  } else {
	console.log("Server listening on: http://localhost:%s", PORT);
  }

});

//routes for API
routes(app);