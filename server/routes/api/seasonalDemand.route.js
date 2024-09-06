const express = require('express');
const router = express.Router();
const SeasonalRecordController = require('../../controller/seasonalDemand.controller');

//Create a new  record
router.post('/', SeasonalRecordController.createSeasonalDemandRecord);

//Read all  records
router.get('/', SeasonalRecordController.getAllSeasonalDemandRecords);

//Read a single  records
router.get('/:id', SeasonalRecordController.getSeasonalDemandRecordById);

// Update a  record by ID
router.put('/:id', SeasonalRecordController.updateSesonalDemandRecordById);

// Delete a  record by ID
router.delete('/:id', SeasonalRecordController.deleteSeasonalDemandRecordById);

module.exports = router;