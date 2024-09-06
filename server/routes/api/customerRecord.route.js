const express = require('express');
const router = express.Router();
const CustomerRecordController = require('../../controller/customerRecord.controller');

//Create a new customer record
router.post('/', CustomerRecordController.createCustomerRecord);

//Read all customer records
router.get('/', CustomerRecordController.getAllCustomerRecords);

//Read a single customer records
router.get('/:id', CustomerRecordController.getCustomerRecordById);

// Update a customer record by ID
router.put('/:id', CustomerRecordController.updateCustomerRecordById);

// Delete a customer record by ID
router.delete('/:id', CustomerRecordController.deleteCustomerRecordById);

module.exports = router;