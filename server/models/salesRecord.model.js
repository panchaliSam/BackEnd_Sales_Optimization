const mongoose = require('mongoose');

//Define the available options for dropdown fields
//Sample categories
const productCategories = ['Clothing', 'Footwear', 'Accessories'];
//Sample provinces of Sri Lanka
const sriLankanProvinces = [
    'Western', 'Central', 'Southern', 'Northen',
    'Eastern', 'North Western', 'North Central',
    'Uva', 'Sabaragamuwa'
];
//Sample Brands
const productBrands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'];

const salesRecordSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
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
});

module.exports = mongoose.model('SalesRecord', salesRecordSchema);