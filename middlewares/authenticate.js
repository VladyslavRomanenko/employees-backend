const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");
const { JWT_SECRET } = process.env;

const { User } = require("../models/User");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};
module.exports = authenticate;
