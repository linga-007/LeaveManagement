const router = require('express').Router();
const {Login,Register,GetEmp} = require('../controllers/employeeController');
const checkUser = require('../middleware/auth')

router.post('/login',Login)
router.post('/register',Register)
router.post('/getEmp',checkUser ,GetEmp)

module.exports = router;