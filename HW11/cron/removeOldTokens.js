const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { ActionToken, OAuth } = require('../dataBase');
const { MONTH } = require('../config/cronItem');

dayJs.extend(utc);

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, MONTH);

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
