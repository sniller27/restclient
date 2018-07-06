//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.dev.HOST;
let feedback;

module.exports = (searchTerm) => {

  if(searchTerm == undefined){
    searchTerm = "";
  }

  request.get(
      `${UrlAPI}/customers`,
      { json: { keyword: searchTerm, token: localStorage.getItem("token") } },
      (error, response, body) => {

          if (!error && response.statusCode == 200) {

              feedback = (body.length == 0) ? "No results found" : body;
              console.table(feedback);


          }else {

              feedback = "Something went wrong!";
              console.log(feedback);
          
          }
          
      }
  );

}