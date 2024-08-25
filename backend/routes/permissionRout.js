const router = require('express').Router();
const {ApplyPermission,AcceptPermission,DenyPermission,GetPermission} = require('../controllers/permission');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyPermission)
router.post('/accept', checkUser, AcceptPermission)
router.post('/deny', checkUser ,DenyPermission)
router.get('/getLeave', checkUser, GetPermission)

module.exports = router;