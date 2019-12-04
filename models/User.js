const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  products: [Schema.Types.Mixed],
  follows: [Schema.Types.Mixed],
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: { type: String, select: false },
  passwordReset: { type: String, select: false }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
