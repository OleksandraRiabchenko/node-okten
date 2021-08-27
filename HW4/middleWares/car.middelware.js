const { Car } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

const { errorMessage, statusCode } = require('../config');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkYear: (req, res, next) => {
        try {
            const { year } = req.body;

            if (year > 2021) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.WRONG_YEAR);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
