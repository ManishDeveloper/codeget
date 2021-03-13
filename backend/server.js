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
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/category",require("./routes/categoryRoutes"));
app.use("/api/quiz",require("./routes/quizRoutes"));


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log(`Server Started on Port: ${PORT} in ${process.env.NODE_ENV} mode`)} );