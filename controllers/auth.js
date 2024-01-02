const { User } = require("../models/User");
const { controlWrapper } = require("../helpers/controlWrapper");
const httpError = require("../helpers/httpError");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// REISTER
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  res.json({ token: token });
};

const current = async (req, res) => {
  res.send("current");
};
const logout = async (req, res) => {
  res.send("logout");
};

const getAll = async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
};

module.exports = {
  login: controlWrapper(login),
  register: controlWrapper(register),
  current: controlWrapper(current),
  logout: controlWrapper(logout),
  getAll: controlWrapper(getAll),
};
