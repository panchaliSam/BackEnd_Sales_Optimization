const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const { connectDatabse } = require("./config");
const routes = require("./routes");

//Express app
const app = express();
const port = process.env.PORT || 4003;

//MongoDB connection
connectDatabse();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use(routes);

//Route to check connection
// app.get('/', (req, res) => {
//     res.json({
//         message: 'MongoDB Connected Successfully!',
//         status: 200,
//         port: port
//     });
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});