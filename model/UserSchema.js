const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  likedArr: {
    type: Array,
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  signUpDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
