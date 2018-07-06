//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.dev.HOST;
let feedback;

module.exports = (username, password) => {

  request.post(
      `${UrlAPI}/register`,
      { json: { username: username, password: password } },
      (error, response, body) => {
          if (!error && response.statusCode == 200) {
              
              feedback = body;
          }else {
              feedback = "Something went wrong";
          }
          console.log(feedback);
      }
  );

}