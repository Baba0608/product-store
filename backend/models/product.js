const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },

  count: {
    type: Number,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  imageURL: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
