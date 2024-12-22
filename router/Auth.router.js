// Initilize express router
const express = require("express");

// Authorizor context Middleware
const IsLoggedIn = require("../middleware/IsLoggedIn");

// Import the UserAuthController
const UserAuthController = require("../controller/Auth.controller");

// User Validator Middleware
// const {validateUser} = require("../middleware/userValidator")

// Initialize the UserAuthController
const userAuthController = new UserAuthController();

// Mountable Route
const auth = express.Router();


/**
 * Define the routes according to the CRUD operations
 * 
 * @see IsLoggedIn - A middleware to check if the user is logged in
 * @see validateUser - A middleware to validate the user
 * @see validateUserId - A middleware to validate the user ID
 */

// Create a new user 
auth.post("/", userAuthController.createUser);
/* 
// Get all users
auth.get("/worko/user", getAllUsers);

// Get a user by ID
auth.get("/worko/user/:userId", IsLoggedIn,validateUserId, getUserById);

// Update a user
auth.put("/worko/user/:userId", IsLoggedIn,validateUserId, validateUser, updateUser);

// Update a user partially
auth.patch("/worko/user/:userId",IsLoggedIn, validateUserId, partialUpdateUser);

// Delete a user
auth.delete("/worko/user/:userId",validateUserId, deleteUser);
 */

// Export the auth module
module.exports = auth;