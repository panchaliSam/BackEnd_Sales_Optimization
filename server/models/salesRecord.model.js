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

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const salesRecordSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
            min: 2000,
            max: new Date().getFullYear()
        },
        month: {
            type: String,
            enum: months,
            required: true
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

// Create a unique index on year and month to prevent duplicates
salesRecordSchema.index({ year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('SalesRecord', salesRecordSchema);
