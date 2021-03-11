const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:[true,'Name is required']
    },
    email:{
        type:String,
        uniqure:true,
        requried:[true,'Email is required']
    },
    password:{
        type:String,
        requried:[true,'Password is required']
    }
},{timestamps:true});


module.exports = mongoose.model('users',userSchema);