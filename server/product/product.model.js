const mongoose = require("mongoose");
const APIError = require("../helpers/APIError");
const httpStatus = require("http-status");

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

/**
 * Methods
 */
ProductSchema.method({});

ProductSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Product[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = {
  ProductSchema,
  Product: mongoose.model("Product", ProductSchema),
};
