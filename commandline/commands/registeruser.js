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
  * Sends a HTTP request if a token is received the setToken method is called otherwise error string is returned
  * @return {function/string} returns setToken function or error string
  */
  const requestRegisterUser = async () => {  
      let response = await rp(options);
      let feedback = response ? response : strings.feedback.suddenerror;
      console.log(feedback);
  };

  requestRegisterUser();

}