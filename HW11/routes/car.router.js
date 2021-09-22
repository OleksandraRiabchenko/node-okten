const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');
const {
    dbField,
    paramName,
    searchIn,
    validatorsName
} = require('../config');

router.get(
    '/',
    carController.getAllCars
);
router.post(
    '/',
    carMiddleware.validateCarDinamic(validatorsName.car.createCar, searchIn.BODY),
    carController.createCar
);
router.get(
    '/:car_id',
    carMiddleware.isCarPresentByDynamicParam(paramName.car.CAR_ID, searchIn.PARAMS, dbField._ID),
    carController.getSingleCar
);
router.delete(
    '/:car_id',
    carMiddleware.isCarPresentByDynamicParam(paramName.car.CAR_ID, searchIn.PARAMS, dbField._ID),
    carController.deleteCar
);
router.put(
    '/:car_id',
    carMiddleware.validateCarDinamic(validatorsName.car.updateCar, searchIn.BODY),
    carMiddleware.isCarPresentByDynamicParam(paramName.car.CAR_ID, searchIn.PARAMS, dbField._ID),
    carController.updateCar
);

module.exports = router;
