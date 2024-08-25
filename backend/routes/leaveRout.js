const router = require('express').Router();
const {ApplyLeave,AcceptLeave,DenyLeave,GetLeave} = require('../controllers/leaveController');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyLeave)
router.post('/accept', checkUser, AcceptLeave)
router.post('/deny', checkUser ,DenyLeave)
router.get('/getLeave', checkUser, GetLeave)

module.exports = router;