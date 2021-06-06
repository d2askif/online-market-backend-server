const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  weight: {
    type: Number,
    default: 0,
  },
  volume: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  qrCode: {
    type: String,
    default: "",
  },
});

module.exports = {
  ProductSchema,
  Product: mongoose.model("Product", ProductSchema),
};
