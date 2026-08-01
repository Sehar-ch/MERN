const express = require("express");
const app = express();
const Port = 8000;
console.log("Server file started");

app.get("/", (req, res) => {
  res.send("Hello From Express server");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});