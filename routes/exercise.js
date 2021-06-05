const router = require('express').Router();
const controller = require('../controller/exerciseController');

router.get('/', controller.getAllExercises);
router.post('/', controller.addNewExercise);
router.put('/:EventId', controller.updateExercise);
router.delete('/', controller.deleteExercise);

module.exports = router;