// Import DAO
const authDaoObj = require("../dao/Auth.dao");

// Import Dto
const UserDto = require("../interface/Auth.dto");

// Import Jwt
const jwt = require("jsonwebtoken");

// Import env
const env = require("dotenv");
const globalConstantsObj = require("../constants/Global.constants");
env.config({ path: "../../Private.env" });

/**
 * @class AuthService
 * 
 * @description Service class for handling user authentication
 */
class AuthService {
  /**
   * @method createUser
   * 
   * @description Service method for creating a new user
   * 
   * @param {Object} userData 
   * 
   * @returns {Object} user
   */
  async createUser(userData) {
      // Log the request
      global.logger.info("[service] Processing request to create a new user",{
        fileName:__filename,
        methodName: this.createUser.name,
        userData: userData
      });

    // // Check if the user already exists
    // const existingUser = await this.get(userData.email); // Assuming email is unique

    // If user already exists, throw an error
    // if(!existingUser){
    //   throw new Error("User already exists") //@Todo need to make a base error class
    // }
    
    // Create a new user
    const user = authDaoObj.createUser(userData);
    
    // Generate JWT token for the newly created user
    const token = jwt.sign(
      { userId: user._id },
      process.env.PRIVATE_TOKEN_KEY,
      { expiresIn: globalConstantsObj.TOKEN_EXPIRY }
    );
    
    // Return the user and token by wrapping it in a DTO
    return { user: new UserDto(user), token };
  };
}

// Export the service class
const authServiceObj = new AuthService();
module.exports = authServiceObj;














/* exports.getAllUsers = async () => {
    const users = await userDao.getAllUsers();
    return users.map(user => new UserDto(user));
  };
  
  exports.getUserById = async (userId) => {
    const user = await userDao.getUserById(userId);
    return new UserDto(user);
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
 */
