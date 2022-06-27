const mongoose = require("mongoose");


const userQuizSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    quizDone:[
        {type:String, _id: false,required:true}
    ]
},{timestamps:true});


module.exports = mongoose.model('userQuiz',userQuizSchema);