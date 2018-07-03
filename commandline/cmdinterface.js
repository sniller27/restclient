#!/usr/bin/env node
const program = require('commander');

//for HTTP request (not fetch API)
var request = require('request');

//for fetch API
require('es6-promise').polyfill();
require('isomorphic-fetch');

//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const link = "http://localhost:8080/api/artists";
const urla = 'https://randomuser.me/api/?results=10'; 

program 
  .version('1.0.0')
  .description('Client Management System');


  /**
   * LOGIN
   */
  program
  .command('login')
  .alias('l')
  .description('User login')
  .action((a) => {

    // process.argv.forEach(function (val, index, array) {
    //   console.log(index + ': ' + val);
    //   console.log(array.length);
    // });

    //first arg
    // console.log(process.argv[3]);
    const username = process.argv[3];
    const password = process.argv[4];


    request.post(
        "http://localhost:8080/api/authenticate",
        { json: { username: username, password: password } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body.token);
                localStorage.setItem("token", body.token);
                console.log("You're successfully logged in");
            }else {
                console.log("Wrong username and password");
            }
        }
    );

  });


  /**
   * LIST CUSTOMERS
   */

  program
  .command('list')
  .alias('l')
  .description('List customers')
  .action(() => {
    // prompt(questions).then(answers => addCustomer(answers));
    // 
    
    // fetch(link, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    // .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    // .then(response => {
    //  console.log("got it")
    //     // here you do what you want with response
    // })
    // .catch(err => {
    //     console.log("u")
    //     alert("sorry, there are no results for your search")
    // });

    // fetch(link)
    // .then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }

    //     return response.json();
    // })
    // .then(function(stories) {
    //     console.log(stories);
    // });


    request.get(
        "http://localhost:8080/api/artists",
        { json: { token: localStorage.getItem("token") } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }else {
                console.log("Something went wrong!");
            }
        }
    );

  });

  /**
   * ADD CUSTOMER
   */
  
  program
  .command('add')
  .alias('a')
  .description('Add customer')
  .action((a) => {

    // process.argv.forEach(function (val, index, array) {
    //   console.log(index + ': ' + val);
    //   console.log(array.length);
    // });

    //first arg
    // console.log(process.argv[3]);
    const name = process.argv[3];
    const email = process.argv[4];
    const phone = process.argv[5];


    request.post(
        "http://localhost:8080/api/artist",
        { json: { name: name, email: email, phone: phone, token: localStorage.getItem("token") } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }else {
                console.log("Something went wrong!");
            }
        }
    );

  });

  /**
   * CUSTOMER SEARCH
   */

  program
  .command('search')
  .alias('s')
  .description('Searches for customers')
  .action((searchTerm) => {
    // prompt(questions).then(answers => addCustomer(answers));
    // 
    
    // fetch(link, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    // .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    // .then(response => {
    //  console.log("got it")
    //     // here you do what you want with response
    // })
    // .catch(err => {
    //     console.log("u")
    //     alert("sorry, there are no results for your search")
    // });
    // 
    // console.log(searchTerm);

    request.get(
        "http://localhost:8080/api/artists",
        { json: { keyword: searchTerm, token: localStorage.getItem("token") } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }else {
                console.log("Something went wrong!");
            }
        }
    );

  });

  //parsing must be after commander methods
  program.parse(process.argv);
