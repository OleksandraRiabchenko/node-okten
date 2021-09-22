const { Schema, model } = require('mongoose');
const { dbTablesEnum: { ActionToken, USER } } = require('../config');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(ActionToken, ActionTokenSchema);
