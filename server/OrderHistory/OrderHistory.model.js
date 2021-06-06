const mongoose = require("mongoose");
const { OrderSchema } = require("../order/order.model");

const orderHistory = new mongoose.Schema(
  {
    orders: [{ type: OrderSchema, default: [] }],
  },
  { timestamps: true }
);

module.exports = {
  OrderHistory: mongoose.model("OrderHistory", orderHistory),
};

/*
 {
     _id:
     products:[
         {
            _id:
            name:
            price:
            description:
         }
     ],
     count:
     totalPrice
     status:
 }
 */
