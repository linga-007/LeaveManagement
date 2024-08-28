const router = require('express').Router();
const {getDetails} = require('../controllers/tableController');
const checkUser = require('../middleware/auth')

router.post('/getDetails',checkUser ,getDetails)

module.exports = router;