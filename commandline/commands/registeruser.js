//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const strings = require('../../app/strings/strings.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (username, password) => {

  let options = {
      method: 'POST',
      uri: `${UrlAPI}/register`,
      body: { 
        username: username, 
        password: password
      },
      json: true
  };

  /**
  * Sends a HTTP request. If a response is received, it will be printed to the client otherwise error string is printed
  * @return {string} returns confirmation string or error string
  */
  const requestRegisterUser = async () => {  
      let response = await rp(options);
      let feedback = response ? response : strings.feedback.suddenerror;
      console.log(feedback);
  };

  requestRegisterUser();

}