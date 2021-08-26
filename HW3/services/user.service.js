const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.readFile);

module.exports = {

    getUsersFromDb: async (path_users) => {
        const users = await readFilePromise(path_users);

        return JSON.parse(users.toString());
    },

    addUsersToDb: async (path_users, users) => {
        await writeFilePromise(path_users, JSON.stringify(users));
    }
};
