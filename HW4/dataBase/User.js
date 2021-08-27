const { Schema, model } = require('mongoose');
const userRolesEnam = require('../config/user-roles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRolesEnam.USER,
        enum: Object.values(userRolesEnam)
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
