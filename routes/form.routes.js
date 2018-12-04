let express = require('express')
let router = express.Router() ; 
let formController = require('../controllers/form.controllers')

router.route('/form/set').post(formController.setForm) ;
router.route('/form/get/:formName').get(formController.getForm) ;
router.route('/form/edit').post(formController.saveEditedForm) ;


module.exports = router ;

