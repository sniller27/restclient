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

        feedback = 
        !error 
        && response.statusCode == 200 
        ? (nullifiedTokenCheck()) : "You're not logged in";
          
          console.log(feedback);
      }
  );

  let nullifiedTokenCheck = (body) => {
    return localStorage.getItem("token") == "" ? "You are already logged out" : nullifyToken();
  };

  let nullifyToken = (body) => {
    localStorage.setItem("token", "");
    return "You have been logged out";
  };

}