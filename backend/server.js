const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//connect db
require("./config/DB");


//middleware
app.use(express.json());
app.use(cors());

//routes



//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log(`Server Started on Port: ${PORT} in ${process.env.NODE_ENV} mode`)} );