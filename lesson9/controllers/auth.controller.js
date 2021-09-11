const {
    actionTokenEnum,
    constants: { AUTHORIZATION },
    emailActionsEnum,
    variables: { FRONTEND_URL }
} = require('../config');
const { ActionToken, OAuth, User } = require('../dataBase');
const { passwordService, jwtService, emailService } = require('../service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(200).json('OK');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    sendEmailForgotPass: async (req, res, next) => {
        try {
            const { user } = req;

            const actionToken = jwtService.generateActionToken(actionTokenEnum.FORGOT_PASS);

            await ActionToken.create({ token: actionToken, user: user._id });

            await emailService.sendMail(
                'alryab4enko@gmail.com', // user.email
                emailActionsEnum.FORGOT_PASS,
                { userName: user.name, forgotPasswordURL: `${FRONTEND_URL}/password?token=${actionToken}` }
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
            const token = req.get(AUTHORIZATION);

            const hashPassword = await passwordService.hashPassword(password);

            await User.findByIdAndUpdate(_id, { password: hashPassword });
            await ActionToken.deleteOne({ token });
            // щоб розлогінити юзера з усіх девайсів, видаляємо з бази всі токена цього юзера:
            await OAuth.deleteMany({ user: _id });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
