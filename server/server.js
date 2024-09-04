const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const { connectDatabse } = require("./config");

//Import salesRecord Routes
const SalesRecordRoutes = require('./routes/salesRecord.route')

//Express app
const app = express();
const port = process.env.PORT || 4003;

//MongoDB connection
connectDatabse();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use('/api/sales-records', SalesRecordRoutes);

//Route to check connection
app.get('/', (req, res) => {
    res.json({
        message: 'MongoDB Connected Successfully!',
        status: 200,
        port: port
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});