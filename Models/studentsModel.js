const mongoose = require("mongoose");
const Joi = require("joi");

// Students schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isEnrolled: { type: Boolean, default: false },
  email: { type: String, required: true },
});

// student Model
const Student = new mongoose.model("student", studentSchema);

function validateData(student) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email(),
    isEnrolled: Joi.boolean(),
  };
  return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validateData = validateData;
