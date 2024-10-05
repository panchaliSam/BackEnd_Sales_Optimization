const Sales = require('../models/SalesModel');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create a new sales record
exports.createSalesRecord = async (req, res) => {
    try {
        
        const newSalesRecord = new Sales({
            product: req.body.product,
            month: req.body.month,
            sales: req.body.sales
        });

        await newSalesRecord.save();

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
            // Now that the CSV is parsed, pass the file to the Python script for predictions
            exec(`python3 path/to/your/sales_prediction.py ${csvFilePath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Python script:', error);
                    return res.status(500).json({ error: 'Error processing CSV file for predictions' });
                }

                // Parse the Python output (which should be JSON)
                const predictions = JSON.parse(stdout);

                // Respond with the predictions from the Python model
                res.json({ csvData: results, predictions });

                // Clean up: delete the uploaded CSV file after processing
                fs.unlink(csvFilePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            });
        })
        .on('error', (error) => {
            res.status(500).json({ error: 'Error processing CSV file' });
        });
};








