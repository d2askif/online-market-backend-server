const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const productCtrl = require("./product.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(productCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createProduct), productCtrl.create);

router
  .route("/:productId")
  /** GET /api/users/:userId - Get user */
  .get(productCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), productCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(productCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param("productId", productCtrl.load);

module.exports = router;
