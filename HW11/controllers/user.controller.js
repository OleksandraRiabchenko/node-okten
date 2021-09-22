const { User } = require('../dataBase');
const { emailActions, statusCodes, userConstants: { USERS } } = require('../config');
const { passwordService, emailService, s3Service } = require('../service');
const { userNormalizator } = require('../utils');
const { USER } = require('../config/user.roles.enum');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToNorm = userNormalizator.userNormalizator(req.user);

            res.json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            const usersToNorm = users.map((user) => userNormalizator.userNormalizator(user));

            res.json(usersToNorm);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);
            let createdUser = await User.create({ ...req.body, password: hashedPassword });

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, createdUser._id);

                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const userToNorm = userNormalizator.userNormalizator(createdUser);

            await emailService.sendMail(
                userToNorm.email,
                emailActions.CREATE,
                { userName: userToNorm.name }
            );

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user, params: { user_id } } = req;

            if (user.avatar) {
                await s3Service.deleteFile(user.avatar);
            }

            await User.deleteOne({ _id: user_id });

            if (user.role === USER) {
                await emailService.sendMail(
                    user.email,
                    emailActions.DELETED_BY_USER,
                    { userName: user.name }
                );
            } else {
                await emailService.sendMail(
                    user.email,
                    emailActions.DELETED_BY_ADMIN,
                    { userName: user.name }
                );
            }
            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user, params: { user_id } } = req;
            let updatedUser = await User.findByIdAndUpdate(user_id, req.body);

            if (req.files && req.files.avatar) {
                if (user.avatar) {
                    await s3Service.deleteFile(user.avatar);
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, updatedUser._id);

                updatedUser = await User.findByIdAndUpdate(
                    updatedUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const userToNorm = userNormalizator.userNormalizator(updatedUser);

            await emailService.sendMail(
                userToNorm.email,
                emailActions.UPDATE,
                { userName: userToNorm.name }
            );

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    }
};
