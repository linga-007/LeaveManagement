const router = require('express').Router();
const {ApplyLeave,LOP,AcceptLeave,DenyLeave,GetLeave} = require('../controllers/leaveController');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyLeave)
router.post('/applyLOP', checkUser, LOP)
router.get('/accept/:leaveId',AcceptLeave)
router.get('/deny/:leaveId',DenyLeave)
router.post('/accept',checkUser, Accept)
router.post('/deny',checkUser,Deny)
router.post('/getLeave', checkUser, GetLeave)

module.exports = router;