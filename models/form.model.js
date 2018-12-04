let mongoose = require('mongoose') ; 

let QuestionsArray = mongoose.Schema({
     "qNumber":String,
     "qType":String,
     "question":String,
     "required":Boolean,
     "subQuestions":Array
},{
     _id:false
 })

let FormsSchema =  mongoose.Schema({
    "formTitle":{type:String,
                    unique:true } ,
    "formDescription":String ,
     "QuestionsArray":[QuestionsArray]
})

mongoose.model('FormsSchema',FormsSchema,'admindb.Forms')