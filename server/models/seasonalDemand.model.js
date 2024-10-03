const mongoose = require('mongoose');

const sriLankanSesons = [
    'Sinhala and Tamil New Year',
    'Christmas Season',
    'Easter Season',
    'Black Friday',
    'Women\'s Day',
    'Valentine\s Day'
];



const seasonalDemandSchema = new mongoose.Schema(
    {
        season: {
            type: String,
            enum: sriLankanSesons,
            //required: true
        },
        year: {
            type: Number,
            required: true,
            min: 2000,
            max: new Date().getFullYear()
        },
        noOfTransactions: {
            type: Number,
            required: true
        },
        totalRevenue: {
            type: Number,
            required: true
        },
        averageTotalValue: {
            type: Number,
            required: true
        },
        promotionalEffect: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('SeasonalDemand', seasonalDemandSchema);