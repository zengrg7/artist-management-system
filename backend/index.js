const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");

const app = express();
app.use(cors());
app.use(express.json()); //to parse json data

//routes for user, artist and song
app.use("/users", userRoutes);
app.use("/artists", artistRoutes);
app.use("/songs", songRoutes);

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Artist Management System");
});

//starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
