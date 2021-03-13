const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_LOCAL_URI,{
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>console.log(`DB connected..`))
.catch(err=>console.log(err));