const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
} = require("../../controllers/employee");

const { employeeSchema } = require("../../schemas/employee");
const validateBody = require("../../decorators/validateBody");

router.get("/", getAllEmployees);
router.post("/", createEmployee, validateBody(employeeSchema));

module.exports = router;
