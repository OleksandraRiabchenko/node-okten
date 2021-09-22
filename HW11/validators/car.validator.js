const Joi = require('joi');
const { MIN_YEAR, MAX_YEAR } = require('../config/car.constants');

const createCarValidator = Joi.object({
    model: Joi.string().min(2).max(30).required()
        .trim(),
    year: Joi.number().min(MIN_YEAR).max(MAX_YEAR).required(),
    price: Joi.number().required()
});

const updateCarValidator = Joi.object({
    model: Joi.string().min(2).max(30).trim(),
    year: Joi.number().min(MIN_YEAR).max(MAX_YEAR),
    price: Joi.number()
});

module.exports = {
    createCarValidator,
    updateCarValidator
};
