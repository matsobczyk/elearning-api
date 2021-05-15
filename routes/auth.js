const AuthController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyInvitation');
const invitationController = require('../controllers/invite');
const router = require('express').Router();

//register user
router.post('/register',verifyToken, AuthController.register);
router.post('/register/check',invitationController.checkInvitation);
//login user
router.post('/login', AuthController.login);

//register teacher
router.post('/registerTeacher', AuthController.registerTeacher);
//login teacher
router.post('/loginTeacher', AuthController.loginTeacher);


module.exports = router;