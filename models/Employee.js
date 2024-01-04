const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

employeeSchema.post("save", handleValidateError);
employeeSchema.pre("findOneAndUpdate", runUpdateValidators);
employeeSchema.post("findOneAndUpdate", handleValidateError);

const Employee = model("employee", employeeSchema);

module.exports = { Employee };
