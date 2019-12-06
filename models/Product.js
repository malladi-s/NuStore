const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, required: true },
  prodname: { type: String, required: true },
  seller: { type: User, required: true },
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
