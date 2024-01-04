const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");
const emailRegex = require("../constants/user-constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);
userSchema.pre("findOneAndUpdate", runUpdateValidators);
userSchema.post("findOneAndUpdate", handleValidateError);

const User = model("user", userSchema);

module.exports = { User };
