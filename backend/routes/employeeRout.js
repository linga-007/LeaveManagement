const router = require('express').Router();
const {Login,Signup,GetEmp} = require('../controllers/employeeController');
const checkUser = require('../middleware/auth')

router.post('/login',Login)
router.post('/signup',Signup)
router.get('/getEmp',checkUser ,GetEmp)

module.exports = router;