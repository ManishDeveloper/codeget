const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI,{
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then((conn)=>console.log(`DB connected on ${conn.connection.host}`))
.catch(err=>console.log(err));