const Wholesaler = require("../models/wholesalerModels");

exports.createWholesaler = async (req, res) => {
    try {
        const newWholesaler = await Wholesaler.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newWholesaler
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};