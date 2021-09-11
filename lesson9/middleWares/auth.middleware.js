const { AUTHORIZATION } = require('../config/constants');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../service');
const { OAuth, ActionToken } = require('../dataBase');

module.exports = {
    // токени зберігаються в header під назвою Authorization звідти їх можна діставати за допомогою req.get('Authorization');
    validateAccessToken: async (req, res, next) => {
        try {
            // const token = req.get('Authorization');
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyToken(access_token);

            const tokenFromDB = await OAuth.findOne({ access_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Not valid token');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyToken(refresh_token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refresh_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Not valid token');
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (tokenType) => async (req, res, next) => {
        try {
            const action_token = req.get(AUTHORIZATION);

            if (!action_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyActionToken(action_token, tokenType);

            const tokenFromDB = await ActionToken.findOne({ token: action_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Not valid token');
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
