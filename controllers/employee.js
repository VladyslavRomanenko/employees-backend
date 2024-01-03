const { controlWrapper } = require("../helpers/controlWrapper");
const httpError = require("../helpers/httpError");
const { Employee } = require("../models/Employee");

const createEmployee = async (req, res, next) => {
  const data = await Employee.create({ ...req.body });
  res.status(201).json(data);
};

const getAllEmployees = async (req, res, next) => {
  const data = await Employee.find();
  res.status(200).json(data);
};

module.exports = {
  createEmployee: controlWrapper(createEmployee),
  getAllEmployees: controlWrapper(getAllEmployees),
};
