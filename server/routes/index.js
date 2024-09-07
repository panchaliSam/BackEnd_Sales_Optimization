const router = require('express').Router();
const salesRecordRoutes = require('./api/salesRecord.route');
const customersRecordRoutes = require('./api/customerRecord.route');
const salesRoutes = require('./api/salesRoutes.route');

const  createSalesRecord  = require('./api/salesRoutes.route');
const uploadCSVFile = require('./api/salesRoutes.route');


router.use('/api/salesRecord', salesRecordRoutes);
router.use('/api/customerRecord',customersRecordRoutes);


router.use('/api/sales', createSalesRecord);


router.use('*', (req, res) => res.status(404).json('No API route found'));

module.exports = router;