const router = require('express').Router();
const salesRecordRoutes = require('./api/salesRecord.route');
const customersRecordRoutes = require('./api/customerRecord.route');

router.use('/api/salesRecord', salesRecordRoutes);
router.use('/api/customerRecord',customersRecordRoutes);


router.use('*', (req, res) => res.status(404).json('No API route found'));

module.exports = router;