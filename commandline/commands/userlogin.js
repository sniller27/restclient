//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.dev.HOST;
let feedback;

module.exports = (username, password) => {

  request.post(
      `${UrlAPI}/authenticate`,
      { json: { username: username, password: password } },
      (error, response, body) => {
          if (!error && response.statusCode == 200 && typeof body.token !== 'undefined') {
              localStorage.setItem("token", body.token);
              feedback = "You're successfully logged in";
          }else {
              feedback = "Wrong username and password";
          }
          console.log(feedback);
      }
  );

}