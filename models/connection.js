let mongoose = require('mongoose') ; 
let CONFIG = require('../config/config');

require('./form.model')
mongoose.connect(CONFIG.DBURL);

var dbConn = mongoose.connection ;

dbConn.on('error',(error)=>{
    console.log("db connection is working");
})

dbConn.on('open',()=>{
    console.log("database connection is successful");
})