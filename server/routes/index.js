const router = require('express').Router();
const salesRecordRoutes = require('./api/salesRecord.route');
const customersRecordRoutes = require('./api/customerRecord.route');
const seasonalDemandRoutes = require('./api/seasonalDemand.route');
const UserRecordRoutes = require('./api/userRecord.route');

router.use('/api/salesRecord', salesRecordRoutes);
router.use('/api/customerRecord', customersRecordRoutes);
router.use('/api/seasonalDemand', seasonalDemandRoutes);
router.use('/api/user', UserRecordRoutes);

router.use('*', (req, res) => res.status(404).json('No API route found'));

module.exports = router;