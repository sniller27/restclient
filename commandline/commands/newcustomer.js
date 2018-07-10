//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const strings = require('../../app/strings/strings.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (name, email, phone) => {

  let options = {
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
  * Sends a HTTP request. If a response is received, it will be printed to the client otherwise error string is printed
  * @return {string} returns confirmation string or error string
  */
  const requestInsertCustomer = async () => {  
      let response = await rp(options);
      let feedback = response ? response : strings.feedback.notloggedin;
      console.log(feedback);
  };

  requestInsertCustomer();

}