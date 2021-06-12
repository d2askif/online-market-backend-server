const { Product } = require("./product.model");

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  const { productId } = req.params;

  Product.findById({ _id: productId })
    .then((product) => {
      res.json(product);
    })
    .catch((e) => {
      next(e);
    });
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((prod) => res.json(prod))
    .catch((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.weight = req.body.weight;
  product.volume = req.body.volume;

  product
    .save()
    .then((prod) => res.json(prod))
    .catch((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then((users) => res.json(users))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user
    .remove()
    .then((deletedUser) => res.json(deletedUser))
    .catch((e) => next(e));
}

module.exports = { load, get, create, update, list, remove };
