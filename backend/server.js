const express = require('express');
const errorHandler = require("./middlewear/errorHandler");
const app = express();
var cors = require("cors");

app.use(cors());
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require('./config/dbConnection');
connectDb();


app.use(express.json());
app.use('/api/user',require('./routes/userRoutes'));
app.use(errorHandler);



app.listen(port, ()=>{
    console.log("server is running on " + port);

})