const Wholesaler = require("../models/wholesalerModels");

exports.createWholesaler = async (req, res) => {
  try {
    const newWholesaler = await Wholesaler.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newWholesaler,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllWholesalerData = async (req, res) => {
  try {
    const newData = await Wholesaler.find(); // Fetch data from DB

    res.status(200).json({
      // Change status to 200 (OK)
      status: "success",
      data: newData,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// ✅ Update a Wholesaler
exports.updateWholesaler = async (req, res) => {
  try {
    const updatedWholesaler = await Wholesaler.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true, // Validate input
      }
    );

    if (!updatedWholesaler) {
      return res
        .status(404)
        .json({ status: "fail", message: "Wholesaler not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedWholesaler,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// ✅ Delete a Wholesaler
exports.deleteWholesaler = async (req, res) => {
  try {
    const wholesaler = await Wholesaler.findByIdAndDelete(req.params.id);

    if (!wholesaler) {
      return res
        .status(404)
        .json({ status: "fail", message: "Wholesaler not found" });
    }

    res.status(204).json({
      status: "success",
      data: null, // No content after deletion
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
