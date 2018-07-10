//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = () => {

  var options = {
      method: 'POST',
      uri: `${UrlAPI}/deauthenticate`
  };

  /**
  * Sends a HTTP request if a token is received the setToken method is called otherwise error string is returned
  * @return {function/string} returns setToken function or error string
  */
  const sendRequest = async () => {  
      let response = await rp(options);
      let feedback = response ? (nullifiedTokenCheck()) : "You're not logged in";
      console.log(feedback);
  };

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

  sendRequest();

}