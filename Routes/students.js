const express = require("express");
const Router = express.Router();
const { Student, validateData } = require("../Models/studentsModel");

Router.get("/", async (req, res) => {
  let students = await Student.find();
  res.status(200).send(students);
});

Router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let stud = await Student.findById(id);
  if (!stud) {
    res.status(404).send("not found");
  }
  res.status(200).send(stud);
});

Router.post("/", async (req, res) => {
  let { error } = validateData(req.body);
  if (error) {
    res.send(404).status(error.details[0].message);
  }
  let student = new Student({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    email: req.body.email,
  });
  await student.save();
  res.send(student);
});

Router.put("/:id", async (req, res) => {
  let { error } = validateData(req.body);
  if (error) {
    console.log(error.details[0].message);
  }
  let student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isEnrolled: req.body.isEnrolled,
      email: req.body.email,
    },
    { new: true }
  );
  res.send(student);
});

Router.delete("/:id", async (req, res) => {
  let student = await Student.findByIdAndRemove(req.params.id);
  if (!student) {
    res.status(404).send(`student not found`);
  }
  res.send(student);
});

module.exports = Router;
