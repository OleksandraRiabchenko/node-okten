const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(400, 'Email or password is wrong');
        }
    }
};