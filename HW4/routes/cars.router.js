const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddelware } = require('../middleWares');

router.get('/', carController.getAllCars);
router.post('/', carMiddelware.checkYear, carController.createCar);
router.get('/:car_id', carMiddelware.isCarPresent, carController.getSingleCar);
router.delete('/:car_id', carController.deleteCar);
router.put('/:car_id', carMiddelware.checkYear, carController.updateCar);

module.exports = router;
