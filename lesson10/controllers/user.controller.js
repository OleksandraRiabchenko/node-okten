const { emailActionsEnum } = require('../config');
const { User } = require('../dataBase');
const { emailService, s3Service } = require('../service');
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

    createUser: async (req, res, next) => {
        try {
            // const { password } = req.body;

            // const hashedPassword = await passwordService.hashPassword(password);
            // const createdUser = await User.create({ ...req.body, password: hashedPassword });

            // використовуємо статичний метод зі схеми замість коду вище
            let createdUser = await User.createUserWithHashPassword(req.body);

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);
                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    
                    { avatar: s3Response.Location }, // Location - шдях, де саме зберігається фото на AWS
                    { new: true } // new - для того щоб повернути оновленій об'єкт
                );
            }

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
