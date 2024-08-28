const router = require('express').Router();
const {ApplyPermission,AcceptPermission,DenyPermission,GetPermission} = require('../controllers/permissionController');
const checkUser = require('../middleware/auth')

router.post('/apply', checkUser, ApplyPermission)
router.post('/accept', checkUser, AcceptPermission)
router.post('/deny', checkUser ,DenyPermission)
router.get('/getPermission', checkUser, GetPermission)

module.exports = router;