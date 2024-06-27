//ROUTES
const express = require("express");
const auth = express.Router();
const IsLoggedIn = require("../middleware/IsLoggedIn");
const {validateUserId, validateUser} = require("../middleware/userValidator")

const { 
    getAllUsers,
    getUserById, 
    createUser,
    updateUser,
    partialUpdateUser,
    deleteUser
 } = require("../controller/userController");

auth.get("/worko/user", getAllUsers);
auth.get("/worko/user/:userId", IsLoggedIn,validateUserId, getUserById);
auth.post("/worko/user", validateUser, createUser);
auth.put("/worko/user/:userId", IsLoggedIn,validateUserId, validateUser, updateUser);
auth.patch("/worko/user/:userId",IsLoggedIn, validateUserId, partialUpdateUser);
auth.delete("/worko/user/:userId",validateUserId, deleteUser);

module.exports = auth;
