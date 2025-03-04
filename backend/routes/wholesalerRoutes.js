const express = require("express");
const wholesalerController = require("../controllers/wholesalerControllers");

const router = express.Router();

router
  .route("/")
  .post(wholesalerController.createWholesaler)
  .get(wholesalerController.getAllWholesalerData);

module.exports = router;
