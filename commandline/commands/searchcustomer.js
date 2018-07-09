//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
let feedback;

module.exports = (searchTerm) => {

  searchTerm == undefined ? "" : searchTerm;

  request.get(
      `${UrlAPI}/customers`,
      { json: { keyword: searchTerm, token: localStorage.getItem("token") } },
      (error, response, body) => {

        !error && response.statusCode == 200 ? console.table(checkResults(body)) : console.log("Something went wrong!");
          
      }
  );

  /**
   * Returns data if its received otherwise error
   * @param  {object} body received data about users
   * @return {string/object}      return object if data is received otherwise string
   */
  
  let checkResults = (body) => {
    return (body.length == 0) ? "No results found" : body;
  };

}