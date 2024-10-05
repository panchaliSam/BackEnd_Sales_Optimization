const express = require('express');
const router = express.Router();
const SalesRecordController = require('../../controller/salesRecord.controller');

// Predictive data for next month's sales quantity for each product category
router.get('/quantity/predictiveData', SalesRecordController.predictiveData);

//Create a new sales record
router.post('/', SalesRecordController.createSalesRecord);

//Read all sales records
router.get('/', SalesRecordController.getAllSalesRecords);

//Read a single sales records
router.get('/:id', SalesRecordController.getSalesRecordById);

// Update a sales record by ID
router.put('/:id', SalesRecordController.updateSalesRecordById);

// Delete a sales record by ID
router.delete('/:id', SalesRecordController.deleteSalesRecordById);

module.exports = router;