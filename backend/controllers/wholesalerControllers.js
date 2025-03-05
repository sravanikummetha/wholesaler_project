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
