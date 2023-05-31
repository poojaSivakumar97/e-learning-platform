const express = require("express");
const app = express();
const categories = require("./Routes/categories");
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(categories);

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

app.listen(PORT, () => {
  console.log(`server listening on Port ${PORT}`);
});
