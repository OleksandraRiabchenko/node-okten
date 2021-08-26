const db = require('../db/users');

module.exports = {
    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        const user = db[user_id];

        if (!user) {
            res.status(404).json('User not found');
        }
        res.json(user);
    },

    getAllUser: (req, res) => {
        res.json(db);
    },

    createUser: (req, res) => {
        console.log(req.body);
        res.json('OK');
    }
};