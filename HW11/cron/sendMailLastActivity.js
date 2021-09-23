const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { OAuth } = require('../dataBase');
const { cronItem: { DAY }, emailActions } = require('../config');
const { emailService } = require('../service');

module.exports = async () => {
    const lastActivity = dayJs.utc().subtract(10, DAY);

    const oldUserTokens = await OAuth.find({ createdAt: { $lte: lastActivity } });

    await Promise.all(oldUserTokens.map(async ({ user }) => {
        await emailService.sendMail(
            user.email,
            emailActions.LAST_ACTIVITY,
            { userName: user.name }
        );
    }));
};
