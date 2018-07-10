//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const strings = require('../../app/strings/strings.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (searchTerm) => {

  searchTerm == undefined ? "" : searchTerm;

  let options = {
      method: 'GET',
      uri: `${UrlAPI}/customers`,
      body: { 
        keyword: searchTerm, 
        token: localStorage.getItem("token") 
      },
      json: true
  };

  /**
  * Sends a HTTP request. If a response is received the checkResults method is called otherwise error string is returned
  * @return {function/string} returns checkResults function or error string
  */
  const requestCustomers = async () => {  
      let response = await rp(options);
      let feedback = response ? console.table(checkResults(response)) : console.log(strings.feedback.notloggedin);
  };

  /**
   * Returns data if its received otherwise error
   * @param  {object} body received data about users
   * @return {string/object}      return object if data is received otherwise string
   */
  
  let checkResults = (body) => {
    return (body.length == 0) ? strings.feedback.notloggedin : body;
  };

  requestCustomers();

}