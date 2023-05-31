const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema - Categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 40 },
});
// Mongodb model
const Category = new mongoose.model("category", categorySchema);

function validateData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validateData = validateData;
