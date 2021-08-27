const User = require('../dataBase/User');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            // if (role !== 'admin') {
            //     throw new ErrorHandler(403, 'Access Denied');
            // }

            const { user } = req;

            res.json(user);
        } catch (e) {
            // NOT GOOD
            // res.status(400).json(e.message());
            next(e);
        }
    },

    // getAllUser: (req, res) => {
    //
    // },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.create(req.body);

            res.json(createdUser);
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
