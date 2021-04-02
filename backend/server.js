const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

//connect db
require("./config/DB");


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/category",require("./routes/categoryRoutes"));
app.use("/api/quiz",require("./routes/quizRoutes"));

//Deployment
if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../frontend/build')));

    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'../', 'frontend', 'build', 'index.html'));
    });
}

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log(`Server Started on Port: ${PORT} in ${process.env.NODE_ENV} mode`)} );