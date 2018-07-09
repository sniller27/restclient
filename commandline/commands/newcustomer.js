//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.current.HOST;
let feedback;

module.exports = (name, email, phone) => {

  request.post(
      `${UrlAPI}/customer`,
      { json: { name: name, email: email, phone: phone, token: localStorage.getItem("token") } },
      (error, response, body) => {

        feedback = !error && response.statusCode == 200 ? body : "Something went wrong!";
        console.log(feedback);
        
      }
  );

}