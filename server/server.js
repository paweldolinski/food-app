const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const env = require("dotenv").config();

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4002;

mongoose.connect(
  isDev ? process.env.REACT_APP_DB_DEV : process.env.REACT_APP_DB,
  (err) => {
    if (!err) {
      console.log("=====================MongoDB connected...");
    } else {
      console.log("=====================MongoDB connected FAILED", err);
    }
  }
);

const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const registerRouter = require("./routes/api/user");

app.use("/user", registerRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;
