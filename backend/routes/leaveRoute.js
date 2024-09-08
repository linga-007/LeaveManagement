const router = require('express').Router();
const {checkLeave,ApplyLeave,withDrawLeave,updateStatus,AcceptLeave,Accept,DenyLeave,Deny,GetLeave} = require('../controllers/leaveController');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyLeave)
router.post('/checkLeave', checkUser, checkLeave)
router.get('/accept/:leaveId',AcceptLeave)
router.get('/deny/:leaveId',DenyLeave)
router.post('/accept',checkUser, Accept)
router.post('/deny',checkUser,Deny)
router.post('/getLeave', checkUser, GetLeave)
router.post('/cancelLeave',checkUser,withDrawLeave)
router.post('/updateLeave',checkUser,updateStatus)

module.exports = router;
