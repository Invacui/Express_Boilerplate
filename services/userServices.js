const userDao = require('../daos/userDao');
const UserDto = require('../dtos/UserDto');
const jwt = require('jsonwebtoken');
const env = require("dotenv");
env.config({path:"../../Private.env"})
const User = require('../models/User')

exports.getAllUsers = async () => {
  const users = await userDao.getAllUsers();
  return users.map(user => new UserDto(user));
};

exports.getUserById = async (userId) => {
  const user = await userDao.getUserById(userId);
  return new UserDto(user);
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();

  // Generate JWT token for the newly created user
  const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_TOKEN_KEY, { expiresIn: '1h' });

  return { user: new UserDto(user), token };
};

exports.updateUser = async (userId, userData) => {
  const user = await userDao.updateUser(userId, userData);
  return new UserDto(user);
};

exports.partialUpdateUser = async (userId, userData) => {
  const user = await userDao.partialUpdateUser(userId, userData);
  return new UserDto(user);
};

exports.deleteUser = async (userId) => {
 
  await userDao.deleteUser(userId);
};
