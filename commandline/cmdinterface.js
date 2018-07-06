#!/usr/bin/env node
const program = require('commander');
//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//config
const apiconfig = require('../config/apiconfig.js');

//commands
const registeruser = require('./commands/registeruser.js');
const userlogin = require('./commands/userlogin.js');
const userlogout = require('./commands/userlogout.js');
const newcustomer = require('./commands/newcustomer.js');
const searchcustomer = require('./commands/searchcustomer.js');

program 
.version('1.0.0')
.description('Client Management System');

/**
 * REGISTER USER
 */

program
.command('register')
.alias('r')
.description('cust register <username> <password>')
.action((username, password) => registeruser(username, password));

/**
 * USER LOGIN
 */

program
.command('login')
.alias('l')
.description('cust login <username> <password>')
.action((username, password) => userlogin(username, password));


/**
 * USER LOGOUT
 */

program
.command('logout')
.alias('lo')
.description('cust logout')
.action(() => userlogout());


/**
 * LIST CUSTOMERS
 */

program
.command('list')
.alias('l')
.description('cust list')
.action(() => searchcustomer());

/**
 * ADD CUSTOMER
 */

program
.command('add')
.alias('a')
.description('cust add <name> <email> <phone>')
.action((name, email, phone) => newcustomer(name, email, phone));

/**
 * CUSTOMER SEARCH
 */

program
.command('search')
.alias('s')
.description('cust search <keyword>')
.action(searchTerm => searchcustomer(searchTerm));

//parsing must be after commander methods
program.parse(process.argv);
