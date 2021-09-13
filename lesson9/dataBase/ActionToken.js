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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

// prehook mongoose
ActionTokenSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(ActionToken, ActionTokenSchema);
