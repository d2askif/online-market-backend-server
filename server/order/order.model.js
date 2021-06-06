// const Promise = require("bluebird");
const mongoose = require("mongoose");
// const httpStatus = require("http-status");
// const APIError = require("../helpers/APIError");
const { ProductSchema } = require("../product/product.model");

const OrderSchema = new mongoose.Schema(
  {
    product: {
      type: ProductSchema,
      default: [],
    },

    count: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = {
  Order: mongoose.model("Order", OrderSchema),
  OrderSchema,
};
