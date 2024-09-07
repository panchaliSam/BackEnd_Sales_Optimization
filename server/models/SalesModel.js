const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    product: {type: String, required: true},
    month: { type: String, required: true },
    sales: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sales', SalesSchema);