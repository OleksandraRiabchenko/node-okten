const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

const { errorMessage, statusCode } = require('../config');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;
            req.testParam = 'Hello';

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCode.CONFLICT, errorMessage.EXIST_EMAIL);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
