const express = require("express");
const Router = express.Router();
const { Course, validateData } = require("../Models/courseModel");
const { Category } = require("../Models/categoriesModel");

Router.get("/", async (req, res) => {
  let courses = await Course.find();
  res.status(200).send(courses);
});

Router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let course = await Course.findById(id);
  if (!course) {
    res.status(404).send("not found");
  }
  res.status(200).send(course);
});

Router.post("/", async (req, res) => {
  let { error } = validateData(req.body);
  if (error) {
    res.send(400).status(error.details[0].message);
  }
  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    res.status(400).send("invalid entry");
  }
  let course = new Course({
    name: req.body.name,
    creator: req.body.creator,
    category: {
      _id: category._id,
      name: category.name,
    },
    isPublished: req.body.isPublished,
    rating: req.body.rating,
  });
  await course.save();
  res.send(course);
});

Router.put("/:id", async (req, res) => {
  let { error } = validateData(req.body);
  if (error) {
    console.log(error.details[0].message);
  }
  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    res.status(400).send("invalid entry");
  }
  let course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      creator: req.body.creator,
      category: {
        _id: category._id,
        name: category.name,
      },
      isPublished: req.body.isPublished,
      rating: req.body.rating,
      publishedDate: req.body.publishedDate,
    },
    { new: true }
  );
  res.send(course);
});

Router.delete("/:id", async (req, res) => {
  let course = await Course.findByIdAndRemove(req.params.id);
  if (!course) {
    res.status(400).send(`course not found`);
  }
  res.send(course);
});

module.exports = Router;
