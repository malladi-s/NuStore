const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = require("./schemas/User");

const productSchema = new Schema({
  prodname: { type: String, required: true },
  seller: { type: UserSchema, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  url: { type: String, required: false },
  isSold: { type: Boolean, required: true },
  image: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
