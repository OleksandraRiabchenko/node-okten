const { PATH_USERS } = require('../config/variables');
const { getUsersFromDb } = require('../services/user.service');

module.exports = {
    // createUser: (req, res) => {
    //
    // },
    //
    // getAllUsers: (req, res) => {
    //
    // },

    getUserById: (req, res) => {
        const { user_id } = req.params;
        const users = getUsersFromDb(PATH_USERS);
        const user = users.find((u) => u.user_id === +user_id);

        if (!user) {
            res.status(404).end('User Not Found');

            return;
        }
        res.json(user);
    }
};
