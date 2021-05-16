const router = require('express').Router();
const answerController = require('../controllers/answer');
const auth = require('../middlewares/auth');

router.get('/', auth.authTeacher || auth.authUser, answerController.getAnswers);
router.get('/:answerId', auth.authAny, answerController.getAnswer);
router.post('/', auth.authUser, answerController.createAnswer);
router.patch('/:answerId', answerController.updateAnswer);
router.delete('/',auth.authTeacher, answerController.deleteAnswer);

module.exports = router;