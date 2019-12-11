const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  timeStamp: { type: Number, required: true },
  id: { type: String }
});

module.exports = mongoose.model("Message", MessageSchema);
