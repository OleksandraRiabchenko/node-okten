const { PATH_USERS } = require('../config/variables');
const { getUsersFromDb } = require('../services/user.service');

module.exports = {
    // createUser: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    //         const users = await getUsersFromDb(PATH_USERS);
    //
    //         const userExist = users.some((user) => user.email === email);
    //
    //         if (userExist) {
    //             res.status(404).end('User exist, choose any email');
    //             return;
    //         }
    //
    //         const lastId = users[users.length - 1].user_id;
    //         const user_id = lastId + 1;
    //
    //         users.push({ user_id, email, password });
    //         await addUsersToDb(PATH_USERS, users);
    //
    //         res.status(201).redirect('/login');
    //     } catch (e) {
    //         res.status(500).json(e.message);
    //     }
    // },

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
