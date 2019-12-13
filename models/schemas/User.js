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
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, "User phone number required"]
  },
  firstName: String,
  lastName: String,
  email: String,
  password: { type: String, select: false },
  passwordReset: { type: String, select: false },
  about: String,
  img: String
});

module.exports = User;
