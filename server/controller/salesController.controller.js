const Sales = require('../models/SalesModel');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Create a new sales record
exports.createSalesRecord = async (req, res) => {
    try {
        // Create a new Sales instance using the data from req.body
        const newSalesRecord = new Sales({
            product: req.body.product,
            month: req.body.month,
            sales: req.body.sales
        });

        // Save the record to the database
        await newSalesRecord.save();

        // Send a response back to the client
        res.status(201).json(newSalesRecord);
        // console.log("Hello")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle CSV file upload and parsing
exports.uploadCSVFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const csvFilePath = path.join(__dirname, '../uploads/', req.file.filename);
    const results = [];

    // Parse CSV file
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Return the parsed CSV data as a JSON response
            res.json(results);

            // Optionally delete the file after parsing
            fs.unlink(csvFilePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        })
        .on('error', (error) => {
            res.status(500).json({ error: 'Error processing CSV file' });
        });
};








