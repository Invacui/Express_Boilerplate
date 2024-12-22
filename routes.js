/**
 * Main application routes
 * 
 * @module routes
 */

// Import the express module as Express is already defined at the top level there is no need to define it again
// Load the npm packages
const { Router } = require('express');

// Router that contains all the routes/endpoints in the application
const routes = Router();

/**
 * Import the Auth route
*/
const Auth = require('./router/Auth.router')
// const User = require('./router/User')

/**
 * Define the Mountable Routes
 */  

// Auth Route
routes.use('/auth', Auth);

// User Route
// routes.use('/user', require('./router/User.router'));

module.exports = routes;
