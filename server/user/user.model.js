const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const { OrderSchema } = require("../order/order.model.js");

/**
 *Order Schema
 */

/**
 * User Schema
 */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cart: {
    orders: [OrderSchema],
  },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderSchema" }],
  email: {
    type: String,
    default: "",
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [
      /^[1-9][0-9]{9}$/,
      "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model("User", UserSchema);
