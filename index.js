let express = require('express') ; 
let app = express() ; 
const CONFIG = require('./config/config');
require('./models/connection')
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()) ;

let formRoutes = require('./routes/form.routes');

app.use(formRoutes) ; 

app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
    console.log(`SERVER STARTED SUCCESSFULLY ON PORT ${CONFIG.PORT}`);
})