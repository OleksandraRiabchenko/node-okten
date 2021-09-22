const { Car } = require('../dataBase');
const { statusCodes } = require('../config');

module.exports = {
    getSingleCar: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(statusCodes.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await Car.deleteOne({ _id: car_id });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const updatedCar = await Car.findByIdAndUpdate(car_id, req.body);

            res.status(statusCodes.CREATED).json(updatedCar);
        } catch (e) {
            next(e);
        }
    }
};
