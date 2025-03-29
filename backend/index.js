const express = require("express");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Artist Management System");
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
