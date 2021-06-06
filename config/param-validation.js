const Joi = require("joi");

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string()
        .regex(/^[1-9][0-9]{9}$/)
        .required(),
    },
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string()
        .regex(/^[1-9][0-9]{9}$/)
        .required(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },

  createProduct: {
    body: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      weight: Joi.number(),
      volume: Joi.number(),
      qrCode: Joi.string(),
    },
  },
  createOrder: {
    body: {
      product: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
        })
      ),
      count: Joi.number().required(),
      totalPrice: Joi.number().required(),
      status: Joi.string()
        .valid(
          "active",
          "processing",
          "shipped",
          "delivered",
          "returned",
          "canceled"
        )
        .required(),
    },
  },
};
