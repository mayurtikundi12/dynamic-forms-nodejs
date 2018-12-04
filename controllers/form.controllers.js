let mongoose = require('mongoose') ;
let FormsShema = mongoose.model('FormsSchema')
let helpers = require('./helpers.controller')

//setForm saves the form for the first time 
module.exports.setForm = (req,res)=>{
    //getting the data from the frontend 
    let data = req.body.formData  
    // save it  to db as per the schema
    console.log('yes this method is working');
    let formSchema = new FormsShema(data)
    formSchema.save((err,dbRes)=>{
        if(err){
            console.log('there is an error in  saving the form data',err);
            res.status(500).send({payload:{
                message:"some error in saving the data",
                sucessflag:true,          
                response:err
            }}) 
        }else{
            res.status(200).send({payload:{
                message:"form saved successfully",
                sucessflag:true,       
                response:dbRes
            }})
        }
    })
}


// gets the form according to the formName
module.exports.getForm = (req,res)=>{
    //here first step will be to get all the data according to the form name or id 
    //send all the data needed in the frontend
    let FormName = req.params.formName ;
    console.log(FormName);
    
   if(FormName){
    FormsShema.findOne({"formTitle":FormName},(err,dbRes)=>{
        if(err){
            console.log('there is an error in  saving the form data',err);
            res.status(500).send({payload:{
                message:"some error in getting the data",
                sucessflag:false,          
                response:err
            }}) 
        }else{
            console.log(dbRes);
            
            res.status(200).send({payload:{
                message:"form got successfully",
                sucessflag:true,       
                response:dbRes
            }})
        }
    })
   }else{
    res.status(404).send({payload:{
        message:"please give the form name",
        sucessflag:false,       
        response:null
    }})  
   }
    
}


//this method saves the edited form in the database 
module.exports.saveEditedForm = (req,res)=>{
    let body = req.body['formData'] ; 
    console.log(body);
    
  let dataValidFlag =   helpers.checkDataValidity([body['formId'],body['formTitle'],
        body['formDescription'],body['QuestionsArray']])
        
    // checking if all the conditions are true
    if(dataValidFlag.dataFlag){
        let formData = {
            "QuestionsArray":body['QuestionsArray'],
            "formDescription":body['formDescription'],
            "formTitle": body['formTitle']
        }

        FormsShema.findById(body.formId,(err,dbRes)=>{
            if (err || dbRes==null) {
                res.status(500).send({payload:{
                    message:`there is some error :${err}`,
                    sucessflag:false,       
                    response:null
                }})    
            } else {
                dbRes.formTitle = body['formTitle'] ;
                dbRes.formDescription  = body['formDescription'] ;
                dbRes.QuestionsArray = body['QuestionsArray']
                dbRes.save((err,newDbRes)=>{
                    if (err) {
                        res.status(500).send({payload:{
                            message:`there is some error :${err}`,
                            sucessflag:false,       
                            response:null
                        }})  
                    } else {
                        res.status(200).send({payload:{
                            message:`form saved successfully`,
                            sucessflag:true,       
                            response:newDbRes
                        }})  
                    }
                })
            }
        })
    }else{
        res.status(404).send({payload:{
            message:`please fill the ${dataValidFlag.element}`,
            sucessflag:false,       
            response:null
        }})
    }
}
