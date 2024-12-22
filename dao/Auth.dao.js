/**
 * @module dao/Auth.dao
 */
const User = require("../db/models/User");

/**
 * @class AuthDao
 *
 * @description DAO class for handling user authentication
 */
class AuthDao {
  /**
   *
   * @method createUser
   *
   * @description DAO method for creating a new user
   *
   * @param {object} userData - User data
   *
   * @returns
   */
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /*
    * @method get
    *
    * @description DAO method for getting a user by email
    *
    * @param {string} email - User email
    *
    * @returns
    */
  async get(email) {
    return await User.findById(email).where({ isDeleted: false });
  }
}

// Export the DAO class
const authDaoObj = new AuthDao();
module.exports = authDaoObj;
















/* 
exports.getAllUsers = async () => {
  return await User.find({ isDeleted: false });
};

exports.getUserById = async (userId) => {
  return await User.findById(userId).where({ isDeleted: false });
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
      throw new Error("User not found.");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error; // Re-throw the error to propagate it upwards
  }
};
 */
