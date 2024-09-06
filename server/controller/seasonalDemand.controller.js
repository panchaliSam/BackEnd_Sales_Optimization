//Import the seasonalDemand model
const { seasonalDemandRecords } = require('../models');

//Create a new record
exports.createSeasonalDemandRecord = async (req, res) => {
    try {
        const newSeasonalRecord = new seasonalDemandRecords(req.body);
        const savedSeasonalRecord = await newSeasonalRecord.save();
        res.status(201).json(savedSeasonalRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get all seasonal demand records
exports.getAllSeasonalDemandRecords = async (req, res) => {
    try {
        const records = await seasonalDemandRecords.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

//Get a single record by Id
exports.getSeasonalDemandRecordById = async (req, res) => {
    try {
        const record = await seasonalDemandRecords.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Update a record by Id
exports.updateSesonalDemandRecordById = async (req, res) => {
    try {
        const updateRecord = await seasonalDemandRecords.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updateRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Delete a record by Id
exports.deleteSeasonalDemandRecordById = async (req, res) => {
    try {
        const deletedRecord = await seasonalDemandRecords.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

