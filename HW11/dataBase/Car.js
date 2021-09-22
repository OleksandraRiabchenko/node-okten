const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');

const carShema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(dbTablesEnum.CAR, carShema);
