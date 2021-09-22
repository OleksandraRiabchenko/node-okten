const { User } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { errorMessage, statusCodes } = require('../config');
const { userValidator } = require('../validators');
// const { ADMIN } = require('../config/user.roles.enum');

module.exports = {
    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [dbField]: value });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
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
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.USER_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserDinamic: (validatorsName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = userValidator[validatorsName].validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkThisUser: (req, res, next) => {
        try {
            const { loginUser: { _id }, params: { user_id } } = req;

            if (_id.toString() !== user_id) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleAndID: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser: { _id, role }, params: { user_id } } = req;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            if (_id.toString() === user_id) {
                return next();
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
