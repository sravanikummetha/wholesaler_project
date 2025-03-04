const mongoose = require('mongoose');

const wholesalerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A wholesaler must have a name'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'A wholesaler must have a category'],
        },
        location: {
            type: String,
            required: [true, 'A wholesaler must have a location'],
        },
        email: {
            type: String,
            required: [true, 'A wholesaler must have an email'],
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'A wholesaler must have a phone number'],
        },
        orders: {
            type: Number,
            default: 0,
        },
        revenue: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Inactive',
        },
        joinDate: {
            type: Date,
            required: [true, 'A wholesaler must have a join date'],
        },
        creditLimit: {
            type: Number,
            default: 0,
        },
        lastPurchase: {
            type: Date,
        },
        warehouse: {
            type: String,
        },
        discount: {
            type: Number,
            min: [0, 'Discount must be at least 1'],
            max: [100, 'Discount can be upto 100'],
            default: 0,
        },
        rating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5'],
            default: 4.0,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const Wholesaler = mongoose.model('Wholesaler', wholesalerSchema);

module.exports = Wholesaler;
