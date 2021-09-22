const { ActionToken, OAuth, User } = require('../dataBase');
const {
    statusCodes,
    userConstants: { AUTHORIZATION },
    emailActions,
    actionTokenEnum: { FORGOT_PASS },
    variables: { FRONTEND_URL }
} = require('../config');
const { passwordService, jwtService, emailService } = require('../service');
const { userNormalizator } = require('../utils');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const userToNorm = userNormalizator.userNormalizator(user);

            await emailService.sendMail(
                userToNorm.email,
                emailActions.AUTH,
                { userName: userToNorm.name }
            );

            res.json({
                ...tokenPair,
                user: userToNorm
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refresh_token } = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const userToNorm = userNormalizator.userNormalizator(user);

            res.json({
                ...tokenPair,
                user: userToNorm
            });
        } catch (e) {
            next(e);
        }
    },

    sendEmailForgotPassword: async (req, res, next) => {
        try {
            const { user } = req;

            const action_token = jwtService.generateActionToken(FORGOT_PASS);

            await ActionToken.create({ token: action_token, user: user._id });

            await emailService.sendMail(
                user.email,
                emailActions.FORGOT_PASSWORD,
                { userName: user.name, forgotPasswordURL: `${FRONTEND_URL}/password?token=${action_token}` }
            );

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    setNewForgotPassword: async (req, res, next) => {
        try {
            const {
                loginUser: { _id },
                body: { password }
            } = req;
            const action_token = req.get(AUTHORIZATION);

            const hashPassword = await passwordService.hashPassword(password);

            await User.findByIdAndUpdate(_id, { password: hashPassword });

            await ActionToken.deleteOne({ action_token });

            await OAuth.deleteMany({ user: _id });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
