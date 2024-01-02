const Joi = require("joi");

const emailRegex = require("../constants/user-constants");

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required().min(6),
});

const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required().min(6),
});

module.exports = {
  userSignInSchema,
  userSignUpSchema,
};
