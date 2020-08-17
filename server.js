const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const env = require("dotenv").config();

const port = process.env.PORT || 4000;

mongoose.connect(process.env.DB, (err) => {
  if (!err) {
    console.log("=====================MongoDB connected...");
  } else {
    console.log("=====================MongoDB connected FAILED", err);
  }
});

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const registerRouter = require("./routes/api/user");
app.use("/user", registerRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;
