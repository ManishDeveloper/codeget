const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quiz'
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    shortDescription:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('category',categorySchema); 