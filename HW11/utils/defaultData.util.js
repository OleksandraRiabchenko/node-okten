const User = require('../dataBase/User');
const { userRolesEnum: { ADMIN }, variables: { ADMIN_PASSWORD } } = require('../config');
const { hashPassword } = require('../service/password.service');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            name: 'Admin',
            email: 'admin@example.com',
            role: ADMIN,
            password: await hashPassword(ADMIN_PASSWORD)
        };

        await User.create(defaultAdmin);
    }
})();
