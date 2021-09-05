const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidator = require('../validators/user.validator');

module.exports = {
    throwIfUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(404, 'user not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(409, 'User already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            // Використовувати звичайний find не гуд, бо перевіряє весь масив даних і повертає масив, тому краще findOne
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(409, `Email ${email} is already exist`);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            console.log(value);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRoleMdlwr: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(403, 'Forbidden');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserbyDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
