const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../errors');
const { statusCodes, errorMessage } = require('../config');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
