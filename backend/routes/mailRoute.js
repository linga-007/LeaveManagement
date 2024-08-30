const router = require('express').Router();
const {Email} = require('../controllers/mailController');
const checkUser = require('../middleware/auth')

router.post('/send',checkUser ,Email)

module.exports = router;