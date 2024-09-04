const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 4003;

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

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