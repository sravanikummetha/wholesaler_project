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
    const newData = await Wholesaler.find();
    console.log(newData, "data");
    res.status(201).json({
      status: "Success",
      data: newData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: JSON.stringify(err),
    });
  }
};
