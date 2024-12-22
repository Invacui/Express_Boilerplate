//SERVICES IMPORTS
const  authServiceObj  = require('../services/Auth.service');

// createUserRequestBodyValidator
const { CreateUserApiRequestValidator } = require('../validator/Auth.validator');

/**
 * @class UserAuthController
 * 
 * @description Controller class for handling user authentication
 */
class UserAuthController {
  /**
   * @method createUser
   * 
   * @description Controller for creating a new user
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  createUser = async (req, res , next) => {
    try {
      // Log the request
      global.logger.info("[controller] Processing request to create a new user",{
        fileName:__filename,
        methodName: this.createUser.name
      });

      // Store the request body
      const  requestBody  = req.body;

      // Validate the request body
      const {error , response} = CreateUserApiRequestValidator.validate(requestBody, { abortEarly: false });

      // If there are errors, return the error message
      if(error){
        return res.status(400).json({
          message: 'Validation error',
          details: error.details.map(x => x.message)
        });
      }
      
      // Pass the data in service
      const { user, token } = await authServiceObj.createUser(requestBody);

      // Return the response
      res.status(201).json({ user, token });
    } catch (error) {
      next(error.message);
    } 
  };
}

module.exports = UserAuthController;

















/* 
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
}; */
