const router = require('express').Router();
const controller = require('../controller/trainerController');

router.get('/', controller.getAllTrainers);
router.post('/', controller.addNewTrainer);
router.put('/:TrainerId', controller.updateTrainer);
router.delete('/:TrainerId', controller.deleteTrainer);

module.exports = router;