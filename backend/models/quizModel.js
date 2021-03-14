const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    question:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    level:{
        type:Number,
        default:1
    },
    answer:[{type:String,required:true}],
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            comment:{
                type:String,
                required:true
            }  
        }
    ]
})

module.exports = mongoose.model('quiz',quizSchema);