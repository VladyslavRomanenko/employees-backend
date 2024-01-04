const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generateToken = (userId) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
};

module.exports = generateToken;
