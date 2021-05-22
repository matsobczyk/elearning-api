const router = require('express').Router();
testController = require('../controllers/test.js')
const auth = require('../middlewares/auth');

router.get('/', auth.authTeacher, testController.getTests);
router.get('/:testId', auth.authAny, testController.getTest);
router.post('/', auth.authTeacher, testController.createTest);
router.patch('/:testId', auth.authTeacher, testController.updateTest);
router.delete('/:testId',auth.authTeacher, testController.deleteTest);


module.exports = router;