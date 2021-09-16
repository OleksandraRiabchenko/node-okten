const { Schema, model } = require('mongoose');

const { USER, OAuth } = require('../config/dbTables.enum');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        // reference робиться на 'user' це посилання на userSchema
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(OAuth, OAuthSchema);