const Joi = require('joi');

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required()
  });
  validateRequest(req, res, next, schema);
};

exports.validateUserId = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required()
  });
  validateRequest(req, res, next, schema, 'params'); // Validate against req.params
};

const validateRequest = (req, res, next, schema, property) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  const { error, value } = schema.validate(req[property], options); // Validate against req[property]
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(x => x.message)
    });
  }
  req[property] = value; // Update req[property] with validated value
  next();
};
