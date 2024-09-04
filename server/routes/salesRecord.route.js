const express = require('express');
const router = express.Router();
const SalesRecordController = require('../controller/salesRecord.controller');

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