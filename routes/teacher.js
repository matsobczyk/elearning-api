const router = require('express').Router();
const invitationController = require('../controllers/invite');
const teacherController = require('../controllers/teacher');
// const gitController = require('../controllers/api/git');
const auth = require('../middlewares/auth');

//invitation
router.get('/invitation/:invitationId', auth.authTeacher, invitationController.getInvitation);
router.post('/invitation/', auth.authTeacher, invitationController.createInvitation);
router.patch('/invitation/:invitationId', auth.authTeacher, invitationController.updateInvitation);
router.delete('/invitation/:invitationId', auth.authTeacher, invitationController.deleteInvitation);
router.get('/invitation', auth.authTeacher, invitationController.getInvitations);

//user
//TODO: patch, post user
router.get('/users', auth.authTeacher, teacherController.getUsers);
router.delete('/user/:userId', auth.authTeacher, teacherController.deleteUser);

//gitHub
// router.get('/git', auth.authTeacher, gitController.pull);

module.exports = router;