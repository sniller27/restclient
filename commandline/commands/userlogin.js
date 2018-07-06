//for HTTP request (not fetch API)
const request = require('request');
//config
const apiconfig = require('../../config/apiconfig.js');
const UrlAPI = apiconfig.dev.HOST;
let feedback;

module.exports = (username, password) => {

  request.post(
      `${UrlAPI}/authenticate`,
      { json: { username: username, password: password } },
      (error, response, body) => {

          feedback = 
          !error 
          && response.statusCode == 200 
          && typeof body.token !== 'undefined' 
          ? setToken(body) : "Wrong username and password";

          console.log(feedback);

      }
  );


  const setToken = (body) => {
    localStorage.setItem("token", body.token);
    return "You're successfully logged in";
  };

}