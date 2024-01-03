const Joi = require("joi");

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  age: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = {
  employeeSchema,
};
