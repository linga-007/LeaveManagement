const router = require('express').Router();
const {ApplyLeave,LOP,AcceptLeave,DenyLeave,GetLeave} = require('../controllers/leaveController');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyLeave)
router.post('/applyLOP', checkUser, LOP)
router.post('/accept', checkUser, AcceptLeave)
router.post('/deny', checkUser ,DenyLeave)
router.get('/getLeave', checkUser, GetLeave)

module.exports = router;