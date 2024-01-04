const { User } = require("../models/User");
const { controlWrapper } = require("../helpers/controlWrapper");
const httpError = require("../helpers/httpError");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../decorators/generateToken");
const { JWT_SECRET } = process.env;

// REISTER
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  newUser.token = generateToken(newUser._id);
  await newUser.save();

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token,
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
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token: token });
};

const current = (req, res) => {
  const { name, email, id } = req.user;
  res.json({ name, email, id });
};
const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(200).json({ token: "Logout success" });
};

module.exports = {
  login: controlWrapper(login),
  register: controlWrapper(register),
  current: controlWrapper(current),
  logout: controlWrapper(logout),
};

//
