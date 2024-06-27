//controller
const env = require("dotenv");
//ENV
env.config({path:'../Private.env'});

//SERVICES IMPORTS
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser
} = require('../services/userServices');
//FETCH USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//FETCH USERS BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//CREATE USERS

exports.createUser = async (req, res) => {
  try {
    const { user, token } = await createUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE USERS
exports.updateUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//PARTIALS UPDATES
exports.partialUpdateUser = async (req, res) => {
  try {
    const user = await partialUpdateUser(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
///DELETE USERS
exports.deleteUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




