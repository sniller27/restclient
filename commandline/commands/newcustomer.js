//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (name, email, phone) => {

  var options = {
      method: 'POST',
      uri: `${UrlAPI}/customer`,
      body: { 
        name: name, 
        email: email, 
        phone: phone, 
        token: localStorage.getItem("token")
      },
      json: true
  };

  /**
  * Sends a HTTP request if a token is received the setToken method is called otherwise error string is returned
  * @return {function/string} returns setToken function or error string
  */
  const sendRequest = async () => {  
      let response = await rp(options);
      let feedback = response ? response : "Something went wrong";
      console.log(feedback);
  };

  sendRequest();

}