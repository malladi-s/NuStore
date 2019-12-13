const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  products: [String],
  follows: [String],
  followers: [String],
  wishlist: [String],
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  profileurl: {
    type: String
  },
  firstName: String,
  lastName: String,
  email: String,
  password: { type: String, select: false },
  passwordReset: { type: String, select: false },
  about: String
});

module.exports = User;
