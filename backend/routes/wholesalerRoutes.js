const express = require("express");
const wholesalerController = require("../controllers/wholesalerControllers");

const router = express.Router();
/**
 * @swagger
 * /wholesaler:
 *   post:
 *     summary: Create a new wholesaler
 *     responses:
 *       201:
 *         description: Wholesaler created successfully
 *   get:
 *     summary: Get all wholesalers
 *     responses:
 *       200:
 *         description: A list of wholesalers
 */

router
  .route("/")
  .post(wholesalerController.createWholesaler)
  .get(wholesalerController.getAllWholesalerData);

// Get, Update, and Delete by ID

/**
 * @swagger
 * /wholesaler/{id}:
 *   patch:
 *     summary: Update a wholesaler by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wholesaler ID
 *     responses:
 *       200:
 *         description: Wholesaler updated successfully
 *   delete:
 *     summary: Delete a wholesaler by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wholesaler ID
 *     responses:
 *       204:
 *         description: Wholesaler deleted successfully
 */
router
  .route("/:id")
  .patch(wholesalerController.updateWholesaler) // Update
  .delete(wholesalerController.deleteWholesaler); // Delete
module.exports = router;
