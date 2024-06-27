const User = require('../models/User');


exports.getAllUsers = async () => {
  return await User.find({ isDeleted: false });
};

exports.getUserById = async (userId) => {
  return await User.findById(userId).where({ isDeleted: false });
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.partialUpdateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.deleteUser = async (userId) => {
  try {
    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error('User not found.');
    }

    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error; // Re-throw the error to propagate it upwards
  }
};