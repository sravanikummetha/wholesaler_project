const express = require("express");
const wholesalerController = require("../controllers/wholesalerControllers");

const router = express.Router();

router
  .route("/")
  .post(wholesalerController.createWholesaler)
  .get(wholesalerController.getAllWholesalerData);

// ✅ Get, Update, and Delete by ID
router
  .route("/:id")
  .patch(wholesalerController.updateWholesaler) // Update
  .delete(wholesalerController.deleteWholesaler); // Delete
module.exports = router;
