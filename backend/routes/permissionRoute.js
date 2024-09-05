const router = require('express').Router();
const {checkPermission,ApplyPermission,AcceptPermission,Accept,DenyPermission,Deny,GetPermission} = require('../controllers/permissionController');
const checkUser = require('../middleware/auth')

router.post('/checkPermission', checkUser, checkPermission)
router.post('/apply', checkUser, ApplyPermission)
router.get('/accept/:permissionId', AcceptPermission)
router.get('/deny/:permissionId',DenyPermission)
router.post('/accept', checkUser, Accept)
router.post('/deny', checkUser ,Deny)
router.post('/getPermission', checkUser, GetPermission)

module.exports = router;