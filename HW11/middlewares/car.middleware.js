const { Car } = require('../dataBase');
const { ErrorHandler } = require('../errors');

const { errorMessage, statusCodes } = require('../config');
const { carValidator } = require('../validators');

module.exports = {
    isCarPresentByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const car = await Car.findOne({ [dbField]: value });

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarDinamic: (validatorName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = carValidator[validatorName].validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
