#!/usr/bin/env node
const program = require('commander');
//for HTTP request (not fetch API)
const request = require('request');
//password hashing module/middleware
const bcrypt = require('bcrypt');
//for fetch API
require('es6-promise').polyfill();
require('isomorphic-fetch');
//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

  program 
  .version('1.0.0')
  .description('Client Management System');

  /**
   * Variables
   */

  // const UrlAPI = "http://localhost:8080/api";
  const UrlAPI = "https://krizorestclient.herokuapp.com/api";
  let feedback;



  /**
   * Register
   */
  
  program
  .command('register')
  .alias('r')
  .description('cust register <username> <password>')
  .action(a => {

    //first arg
    const username = process.argv[3];
    const password = process.argv[4];

    request.post(
        `${UrlAPI}/register`,
        { json: { username: username, password: password } },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                feedback = body;
            }else {
                feedback = "Something went wrong";
            }
            console.log(feedback);
        }
    );

  });

  /**
   * LOGIN
   */
  
  program
  .command('login')
  .alias('l')
  .description('cust login <username> <password>')
  .action(a => {

    //get args
    const username = process.argv[3];
    const password = process.argv[4];


    request.post(
        `${UrlAPI}/authenticate`,
        { json: { username: username, password: password } },
        (error, response, body) => {
            if (!error && response.statusCode == 200 && typeof body.token !== 'undefined') {
                localStorage.setItem("token", body.token);
                feedback = "You're successfully logged in";
            }else {
                feedback = "Wrong username and password";
            }
            console.log(feedback);
        }
    );

  });


  /**
   * LOGOUT
   */
  
  program
  .command('logout')
  .alias('lo')
  .description('cust logout')
  .action(a => {

    request.post(
        `${UrlAPI}/deauthenticate`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {

              if(localStorage.getItem("token") == ""){
                feedback = "You are already logged out";
              }else {
                localStorage.setItem("token", "");
                feedback = "You have been logged out";
              }

            }else {
                feedback = "You're not logged in";
            }
            console.log(feedback);
        }
    );

  });


  /**
   * LIST CUSTOMERS
   */

  program
  .command('list')
  .alias('l')
  .description('cust list')
  .action(() => {

    request.get(
        `${UrlAPI}/customers`,
        { json: { token: localStorage.getItem("token") } },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                feedback = body;
            }else {
                feedback = "Something went wrong!";
            }
            console.log(feedback);
        }
    );

  });

  /**
   * ADD CUSTOMER
   */
  
  program
  .command('add')
  .alias('a')
  .description('cust add <name> <email> <phone>')
  .action(a => {

    //first arg
    const name = process.argv[3];
    const email = process.argv[4];
    const phone = process.argv[5];

    request.post(
        `${UrlAPI}/customer`,
        { json: { name: name, email: email, phone: phone, token: localStorage.getItem("token") } },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                feedback = body;
            }else {
                feedback = "Something went wrong!";
            }
            console.log(feedback);
        }
    );

  });

  /**
   * CUSTOMER SEARCH
   */

  program
  .command('search')
  .alias('s')
  .description('cust search <keyword>')
  .action(searchTerm => {
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
        `${UrlAPI}/customers`,
        { json: { keyword: searchTerm, token: localStorage.getItem("token") } },
        (error, response, body) => {

            if (!error && response.statusCode == 200) {

              feedback = (body.length == 0) ? "No results found" : body;

            }else {

              feedback = "Something went wrong!";
            
            }
            
            console.log(feedback);
        }
    );

  });

  //parsing must be after commander methods
  program.parse(process.argv);
