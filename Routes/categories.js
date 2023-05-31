const express = require("express");
const router = express.Router();
const Joi = require("joi");

let categories = [
  { id: 1, name: "Web development" },
  { id: 2, name: "Mobile App development" },
  { id: 3, name: "photography" },
];

// get all categories
router.get("/categories", (req, res) => {
  res.status(200).send(categories);
});

// get one  category
router.get("/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id == req.params.id);
  if (!category) {
    res.status(404).status("not found");
  }
  res.status(200).send(category);
});

function validateData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(category, schema);
}
// add category
router.post("/categories", (req, res) => {
  const { error } = validateData(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
});

// update category
router.put("/categories/:id", (req, res) => {
  let category = categories.find((c) => c.id == req.params.id);
  if (!category) {
    res.status(404).send("category not found!");
  }
  category.name = req.body.name;
  res.send(category);
});

// delete category

router.delete("/categories/:id", (req, res) => {
  let category = categories.find((c) => c.id == req.params.id);
  if (!category) {
    res.status(404).send("category not found!");
  }
  let index = categories.indexOf(category);
  categories.splice(index, 1);
  res.status(204).send("category deleted!");
});

module.exports = router;
