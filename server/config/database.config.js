const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDatabse = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
};

module.exports = connectDatabse;