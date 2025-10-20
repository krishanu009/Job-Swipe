const express = require('express');
const errorHandler = require("./middlewear/errorHandler");
const app = express();
var cors = require("cors");

app.use(cors());
const dotEnv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

// Connect to database
connectDb();

app.use(express.json());
app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/hr',require('./routes/hrRoutes'));
app.use('/api/job',require('./routes/jobRoutes'));
app.use(errorHandler);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'JobSwipe API is running!' });
});

// For Vercel deployment - export the app
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log("server is running on " + port);
    });
}