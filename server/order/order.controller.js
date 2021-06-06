const Order = require("./order.model");

/**
 * Get user
 * @returns {Order}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Order}
 */
function create(req, res, next) {
  const order = new Order({
    product: req.body.product,
    totalPrice: req.body.totalPrice,
    count: req.body.count,
  });

  order
    .save()
    .then((savedOrder) => res.json(savedOrder))
    .catch((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Order}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user
    .save()
    .then((savedOrder) => res.json(savedOrder))
    .catch((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Order[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Order.list({ limit, skip })
    .then((users) => res.json(users))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {Order}
 */
function remove(req, res, next) {
  const user = req.user;
  user
    .remove()
    .then((deletedOrder) => res.json(deletedOrder))
    .catch((e) => next(e));
}

module.exports = { get, create, update, list, remove };
