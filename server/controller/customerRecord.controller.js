// Import the customerRecords model
const { customerRecords } = require('../models');

// Create a new customer record
exports.createCustomerRecord = async (req, res) => {
    try {
        const newCustomerRecord = new customerRecords(req.body);
        const savedCustomerRecord = await newCustomerRecord.save();
        res.status(201).json(savedCustomerRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all customer records
exports.getAllCustomerRecords = async (req, res) => {
    try {
        const records = await customerRecords.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single customer record by ID
exports.getCustomerRecordById = async (req, res) => {
    try {
        const record = await customerRecords.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a customer record by ID
exports.updateCustomerRecordById = async (req, res) => {
    try {
        const updateRecord = await customerRecords.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updateRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a customer record by ID
exports.deleteCustomerRecordById = async (req, res) => {
    try {
        const deletedRecord = await customerRecords.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
