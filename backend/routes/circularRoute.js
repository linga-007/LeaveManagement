const router = require('express').Router();
const {addCircular,getAllCirculars} = require('../controllers/circularController')
const checkUser = require('../middleware/auth')

router.post('/save',checkUser ,addCircular)
router.get('/getAll',checkUser ,getAllCirculars)

module.exports = router;