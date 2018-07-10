//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
const rp = require('request-promise');

module.exports = (searchTerm) => {

  searchTerm == undefined ? "" : searchTerm;

  var options = {
      method: 'GET',
      uri: `${UrlAPI}/customers`,
      body: { 
        keyword: searchTerm, 
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
      let feedback = response ? console.table(checkResults(response)) : console.log("You're not logged in");
  };

  /**
   * Returns data if its received otherwise error
   * @param  {object} body received data about users
   * @return {string/object}      return object if data is received otherwise string
   */
  
  let checkResults = (body) => {
    return (body.length == 0) ? "No results found" : body;
  };

  sendRequest();

}