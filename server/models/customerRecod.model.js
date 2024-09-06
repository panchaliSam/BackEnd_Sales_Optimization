const mongoose = require('mongoose');

const customerType = ['Regular', 'VIP', 'New', 'Returning'];

// Sample categories
const productCategories = ['Clothing', 'Footwear', 'Accessories'];

const sriLankanProvinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern',
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
];

// Define the schema
const customerRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Customer must be at least 18 years old']
    },
    location: {
        type: String,
        enum: sriLankanProvinces,
        required: true
    },
    totalPurchases: {
        type: Number,
        required: true,
        default: 0
    },
    purchaseFrequency: {
        type: Number, // E.g., how many times the customer makes purchases per month
        default: 0
    },
    averageSpendingPerOrder: {
        type: Number,
        default: 0
    },
    productCategory: {
        type: String,
        enum: productCategories,
        required: true
    },
    customerSegment: {
        type: String,
        enum: customerType, 
        default: 'New' // Assign segment based on total purchases
    },
    lastPurchaseDate: {
        type: Date
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Method to assign customer segment based on their total purchases
customerRecordSchema.methods.assignSegment = function() { 
    if (this.totalPurchases > 10000) {
        this.customerSegment = 'VIP';
    } else if (this.totalPurchases > 5000) {
        this.customerSegment = 'Regular';
    } else if (this.totalPurchases > 1000) {
        this.customerSegment = 'Returning';
    } else {
        this.customerSegment = 'New';
    }
    return this.customerSegment;
};

// Export the model
module.exports = mongoose.model('CustomerRecord', customerRecordSchema);
