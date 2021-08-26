const path = require('path');

module.exports = {
    PORT: 5002,
    PATH_USERS: path.join(__dirname, '..', 'db', 'users.json')
};
