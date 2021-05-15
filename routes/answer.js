const router = require('express').Router();
const answerController = require('../controllers/answer');

router.get('/', answerController.getAnswers);
router.get('/:answerId', answerController.getAnswer);
router.post('/', answerController.createAnswer);
router.patch('/:answerId', answerController.updateAnswer);
router.delete('/', answerController.deleteAnswer);

module.exports = router;