const mongoose = require('mongoose');

// Define the available options for dropdown fields
const productCategories = [
    'Clothing',
    'Footwear',
    'Accessories'
];

const sriLankanProvinces = [
    'Western',
    'Central',
    'Southern',
    'Northern',
    'Eastern',
    'North Western',
    'North Central',
    'Uva',
    'Sabaragamuwa'
];

const productBrands = [
    'BrandA',
    'BrandB',
    'BrandC',
    'BrandD',
    'BrandE'
];

const salesRecordSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            unique: true  // Ensure the date is unique
        },
        salesQuantity: {
            type: Number,
            required: true
        },
        productCategory: {
            type: String,
            enum: productCategories,
            required: true
        },
        productBrand: {
            type: String,
            enum: productBrands,
            required: true
        },
        customerLocation: {
            type: String,
            enum: sriLankanProvinces,
            required: true
        }
    },
    { timestamps: true }
);

// Create a unique index on the date field to prevent duplicate dates
salesRecordSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model('SalesRecord', salesRecordSchema);
