//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (username, password) => {

  var options = {
      method: 'POST',
      uri: `${UrlAPI}/authenticate`,
      body: { 
        username: username, 
        password: password
      },
      json: true
  };

  /**
   * Sends a HTTP request if a token is received the setToken method is called otherwise error string is returned
   * @return {function/string} returns setToken function or error string
   */
  const sendRequest = async () => {  
      let response = await rp(options);
      let feedback = response.token ? setToken(response) : "Wrong username and password";
      console.log(feedback);
  };

  /**
   * Saves token in local storage and returns success string
   * @param  {object} body received data about users
   * @return {string}      returns success string
   */
  
  const setToken = (body) => {
    localStorage.setItem("token", body.token);
    return "You're successfully logged in";
  };

  sendRequest();

    /**
   * Callback
   */

  //  request.post(
  //     `${UrlAPI}/authenticate`,
  //     { json: { username: username, password: password } },
  //     (error, response, body) => {

  //         feedback = !error && response.statusCode == 200 && typeof body.token !== 'undefined' ? setToken(body) : "Wrong username and password";
  //         console.log(feedback);

  //     }
  // );

  /**
   * Promise
   */

  // rp(options)
  //   .then(function(response){
    
  //   feedback = response.token ? setToken(response) : "Wrong username and password";
    
  // });

    
  /**
   * Async await normal
   */

  // async function main() {  
  //     var response = await rp(options);
  //     feedback = response.token ? setToken(response) : "Wrong username and password";
  // }

}