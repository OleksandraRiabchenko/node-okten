const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToNorm = userNormalizator(req.user);

            res.json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    getAllUser: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);
            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToNorm = userNormalizator(createdUser);

            res.json(userToNorm);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.deleteOne({ _id: user_id });

            res.status(204).json(`User with id ${user_id} is deleted`);
        } catch (e) {
            next(e);
        }
    }
};