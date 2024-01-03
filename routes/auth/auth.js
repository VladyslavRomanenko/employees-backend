const express = require("express");
const {
  login,
  register,
  current,
  getAll,
  logout,
} = require("../../controllers/auth");

const schemas = require("../../schemas/user");

const validateBody = require("../../decorators/validateBody");
// const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

const signupValidateMiddleware = validateBody(schemas.userSignUpSchema);
const signinValidateMiddleware = validateBody(schemas.userSignInSchema);

router.post("/register", signupValidateMiddleware, register);
router.post("/login", signinValidateMiddleware, login);
router.get("/current", current);
router.get("/logout", logout);
router.get("/get", getAll);

module.exports = router;
