const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS package

dotenv.config();

const { connectDatabse } = require("./config");
const routes = require("./routes");

// Express app
const app = express();
const port = process.env.PORT || 4002;

// MongoDB connection
connectDatabse();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
}));
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use(routes); // Ensure routes are prefixed with /api

// Route to check connection
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running and MongoDB is connected!',
        status: 200,
        port: port
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
