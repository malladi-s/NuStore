const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./schemas/User");

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
