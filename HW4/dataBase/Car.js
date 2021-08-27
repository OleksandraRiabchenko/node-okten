const { Schema, model } = require('mongoose');

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
}, { timestamps: true });

module.exports = model('car', carShema);
