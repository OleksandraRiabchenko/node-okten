const { PATH_USERS } = require('../config/variables');
const { getUsersFromDb } = require('../services/user.service');

module.exports = {
    // createUser: (req, res) => {
    //
    // },
    //
    getAllUsers: async (req, res) => {
        try {
            const users = await getUsersFromDb(PATH_USERS);
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const users = await getUsersFromDb(PATH_USERS);
            const user = users.find((u) => u.user_id === +user_id);

            if (!user) {
                res.status(404).end('User Not Found');

                return;
            }
            res.json(user);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
};
