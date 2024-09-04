const SalesRecord = require('../models/SalesRecord');

//Create a new sales record 
exports.createSalesRecord = async (req, res) => {
    try {
        const newRecord = new SalesRecord(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get all sales records
exports.getAllSalesRecords = async (req, res) => {
    try {
        const records = await SalesRecord.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get a single sales record by ID
exports.getSalesRecordById = async (req, res) => {
    try {
        const record = await SalesRecord.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Update a sales record by ID
exports.updateSalesRecordById = async (req, res) => {
    try {
        const updateRecord = await SalesRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updateRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a sales record by ID
exports.deleteSalesRecordById = async (req, res) => {
    try {
        const deletedRecord = await SalesRecord.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
