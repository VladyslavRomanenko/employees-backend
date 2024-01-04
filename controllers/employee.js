const { controlWrapper } = require("../helpers/controlWrapper");
const httpError = require("../helpers/httpError");
const { Employee } = require("../models/Employee");

const createEmployee = async (req, res, next) => {
  const { _id: owner } = req.user;
  const data = await Employee.create({ ...req.body, owner });
  res.status(201).json(data);
};

const getAllEmployees = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Employee.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(200).json(data);
};

const getEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.status(200).json(employee);
};

const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);

  res.status(204).json("message: No content");
};

const editEmployee = async (req, res, next) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const employee = await Employee.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  res.status(200).json(employee);
};

module.exports = {
  createEmployee: controlWrapper(createEmployee),
  getAllEmployees: controlWrapper(getAllEmployees),
  editEmployee: controlWrapper(editEmployee),
  deleteEmployee: controlWrapper(deleteEmployee),
  getEmployee: controlWrapper(getEmployee),
};
