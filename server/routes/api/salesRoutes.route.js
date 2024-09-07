const express = require('express');
const router = express.Router();
const { createSalesRecord } = require('../../controller/salesController.controller');
const multer = require('multer');
const { uploadCSVFile } = require('../../controller/salesController.controller');
const upload = multer({ dest: 'uploads/' });

// POST request to create a sales record
router.post('/createSalesRecord', createSalesRecord);

router.post('/upload', upload.single('csvFile'), uploadCSVFile);

module.exports = router;
