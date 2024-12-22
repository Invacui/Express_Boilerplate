const Joi = require('joi');

const CreateUserApiRequestValidator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "Email should be a string",
            "string.empty": "Email should not be empty",
            "string.email": "Email should be a valid email",
            "any.required": "Email is required"
        }),

    name: Joi.string()
        .required()
        .messages({
            "string.base": "Name should be a string",
            "string.empty": "Name should not be empty",
            "any.required": "Name is required"
        }),

    age: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "Age should be a number",
            "number.empty": "Age should not be empty",
            "number.integer": "Age should be an integer",
            "any.required": "Age is required"
        }),

    city: Joi.string()
        .required()
        .messages({
            "string.base": "City should be a string",
            "string.empty": "City should not be empty",
            "any.required": "City is required"
        }),

    zipCode: Joi.string()
        .required()
        .messages({
            "string.base": "Zip code should be a string",
            "string.empty": "Zip code should not be empty",
            "any.required": "Zip code is required"
        })
});

module.exports = { CreateUserApiRequestValidator };
