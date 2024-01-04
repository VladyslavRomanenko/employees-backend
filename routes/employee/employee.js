const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");
const router = express.Router();
const ctrl = require("../../controllers/employee");

const { employeeSchema } = require("../../schemas/employee");
const validateBody = require("../../decorators/validateBody");
router.use(authenticate);
router.get("/", ctrl.getAllEmployees);
router.post("/", ctrl.createEmployee, validateBody(employeeSchema));
router.get("/:id", ctrl.getEmployee);
router.delete("/:id", ctrl.deleteEmployee);
router.put("/:id", ctrl.editEmployee);

module.exports = router;
