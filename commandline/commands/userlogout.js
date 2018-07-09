//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
let feedback;

module.exports = () => {

  request.post(
      `${UrlAPI}/deauthenticate`,
      (error, response, body) => {

        feedback = !error && response.statusCode == 200 ? (nullifiedTokenCheck()) : "You're not logged in";          
        console.log(feedback);
        
      }
  );

  /**
   * Nullifies token in local storage if token is not already nullified otherwise sends message
   * @return {string/function} string that informs that token is already nullified or function that nullifies token
   */
  
  let nullifiedTokenCheck = () => {
    return localStorage.getItem("token") == "" ? "You are already logged out" : nullifyToken();
  };

  /**
   * Nullifies token and return confirmation message
   * @return {string} returns string that confirms token nullification
   */
  
  let nullifyToken = () => {
    localStorage.setItem("token", "");
    return "You have been logged out";
  };

}