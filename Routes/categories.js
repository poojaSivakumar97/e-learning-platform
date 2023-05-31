const express = require("express");
const router = express.Router();
const { validateData, Category } = require("../Models/categoriesModel");

// get all categories
router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.status(200).send(categories);
});

// get one  category
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(400).status("not found");
  }
  res.status(200).send(category);
});

// add category
router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

// update category
router.put("/:id", async (req, res) => {
  let { error } = validateData(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  }
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category) {
    res.status(400).send("category not found!");
  }
  res.send(category);
});

// delete category

router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);
  if (!category) {
    res.status(400).send("category not found!");
  }
  // let index = categories.indexOf(category);
  // categories.splice(index, 1);
  res.status(204).send("category deleted!");
});

module.exports = router;
