const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./categoriesModel");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: categorySchema,
    required: true,
  },
  creator: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  rating: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
  publishedDate: { type: Date, default: Date.now },
});

const Course = new mongoose.model("Course", courseSchema);

const validateData = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
    creator: Joi.string().min(3).required(),
    categoryId: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
  };
  return Joi.validate(course, schema);
};

exports.Course = Course;
exports.validateData = validateData;
