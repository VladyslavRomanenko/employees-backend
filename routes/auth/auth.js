const express = require("express");
const { login, register, current, logout } = require("../../controllers/auth");

const schemas = require("../../schemas/user");

const validateBody = require("../../decorators/validateBody");
const { authenticate } = require("../../middlewares");

const router = express.Router();

const signupValidateMiddleware = validateBody(schemas.userSignUpSchema);
const signinValidateMiddleware = validateBody(schemas.userSignInSchema);

router.post("/register", signupValidateMiddleware, register);
router.post("/login", signinValidateMiddleware, login);
router.get("/current", authenticate, current);
router.post("/logout", authenticate, logout);

module.exports = router;
