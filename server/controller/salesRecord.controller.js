const { salesRecords } = require('../models');
const moment = require('moment');

//Create a new sales record 
exports.createSalesRecord = async (req, res) => {
    try {
        const newRecord = new salesRecords(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get all sales records
exports.getAllSalesRecords = async (req, res) => {
    try {
        const records = await salesRecords.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get a single sales record by ID
exports.getSalesRecordById = async (req, res) => {
    try {
        const record = await salesRecords.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Update a sales record by ID
exports.updateSalesRecordById = async (req, res) => {
    try {
        const updateRecord = await salesRecords.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updateRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a sales record by ID
exports.deleteSalesRecordById = async (req, res) => {
    try {
        const deletedRecord = await salesRecords.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to predict next month's sales quantity for each product category
exports.predictiveData = async (req, res) => {
    try {
        // Get the current year and month
        const currentDate = moment();
        const nextMonth = currentDate.add(1, 'months'); 
        const year = nextMonth.year();
        const month = nextMonth.month() + 1; 

        // Aggregate sales data by product category for the last 3 months
        const salesData = await salesRecords.aggregate([
            {
                $match: {
                    $or: [
                        {
                            year: year,
                            month: moment().subtract(2, 'months').format('MMMM') 
                        },
                        {
                            year: year,
                            month: moment().subtract(1, 'months').format('MMMM')
                        },
                        {
                            year: year,
                            month: moment().format('MMMM') 
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        productCategory: "$productCategory",
                        year: "$year",
                        month: "$month"
                    },
                    totalSalesQuantity: { $sum: "$salesQuantity" }
                }
            },
            {
                $project: {
                    productCategory: "$_id.productCategory",
                    totalSalesQuantity: 1
                }
            }
        ]);

        // Prepare prediction data for next month
        const predictions = {};

        salesData.forEach(record => {
            if (!predictions[record.productCategory]) {
                predictions[record.productCategory] = { totalSales: 0, count: 0 };
            }
            predictions[record.productCategory].totalSales += record.totalSalesQuantity;
            predictions[record.productCategory].count++;
        });

        // Calculate average and prepare prediction
        const predictedSales = [];
        for (const [category, data] of Object.entries(predictions)) {
            const averageSales = data.totalSales / data.count; 
            predictedSales.push({
                productCategory: category,
                predictedSalesQuantity: Math.round(averageSales) 
            });
        }

        // Return the predicted sales for next month
        res.status(200).json({
            year,
            month: moment().month(month - 1).format('MMMM'), 
            predictions: predictedSales
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
