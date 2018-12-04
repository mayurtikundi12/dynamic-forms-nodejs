
//this function will check for the null values given to it as an array
//it will return an object with false dataFlag with the element of array that is not valid
module.exports.checkDataValidity = (dataArray)=>{
    dataFlag=false ;
    falseElement ="";
    for (const element of dataArray) {
        console.log("this is element ==>",element);
        
        if(element){
            dataFlag = true ;
        }else{
            dataFlag = false;
            falseElement = element;
            break ;
        }
    }
    if (dataFlag) {
        return {dataFlag:true,
            element:null
        } ;
    }else{
        return {dataFlag:false,
            element:falseElement
        } 
    }
}