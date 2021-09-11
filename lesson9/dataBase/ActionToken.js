const { Schema, model } = require('mongoose');

const { ActionToken, USER } = require('../config/dbTables.enum');

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
}, { timestamps: true });

module.exports = model(ActionToken, ActionTokenSchema);
