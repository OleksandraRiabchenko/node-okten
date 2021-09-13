const { emailActionsEnum } = require('../config');
const { User } = require('../dataBase');
const { emailService } = require('../service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getSingleUser: async (req, res, next) => {
        try {
            const userToNorm = userNormalizator(req.user);

            await emailService.sendMail(
                'alryab4enko@gmail.com',
                emailActionsEnum.WELCOME,
                { userName: req.user.name }
            );

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

    createUser: (req, res, next) => {
        try {
            // const { password } = req.body;

            // const hashedPassword = await passwordService.hashPassword(password);
            // const createdUser = await User.create({ ...req.body, password: hashedPassword });
            // todo ne zabuti
            console.log(req.files);

            // використовуємо статичний метод зі схеми замість коду вище
            // const createdUser = await User.createUserWithHashPassword(req.body);
            //
            // const userToNorm = userNormalizator(createdUser);
            //
            // res.json(userToNorm);
            res.json({});
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
