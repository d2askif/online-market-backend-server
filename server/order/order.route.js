const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const orderCtrl = require("./order.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(orderCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), orderCtrl.create);

router
  .route("/:orderId")
  /** GET /api/users/:userId - Get user */
  .get(orderCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), orderCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(orderCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param("orderId", orderCtrl.load);

module.exports = router;
