//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.dev.HOST;
let feedback;

module.exports = () => {

  request.post(
      `${UrlAPI}/deauthenticate`,
      (error, response, body) => {
          if (!error && response.statusCode == 200) {

            if(localStorage.getItem("token") == ""){
              feedback = "You are already logged out";
            }else {
              localStorage.setItem("token", "");
              feedback = "You have been logged out";
            }

          }else {
              feedback = "You're not logged in";
          }
          console.log(feedback);
      }
  );

}