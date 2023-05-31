const express = require("express");
const mongoose = require("mongoose");
const app = express();
const categories = require("./Routes/categories");
const students = require("./Routes/students");
const courses = require("./Routes/courses");
const PORT = 8080 || process.env.PORT;

// MongoDb connection
mongoose
  .connect("mongodb://127.0.0.1/e-learning")
  .then((res) => {
    console.log("Connected with DB Successfully !");
  })
  .catch((e) => {
    console.log(`Couldn't connect with db`);
  });

app.use(express.json());
app.use("/categories", categories);
app.use("/courses", courses);
app.use("/students", students);

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

app.listen(PORT, () => {
  console.log(`server listening on Port ${PORT}`);
});
