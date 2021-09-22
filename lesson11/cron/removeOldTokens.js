const dayJs = require('dayjs');
// плагін який дозволяє враховувати часовий пояс
const utc = require('dayjs/plugin/utc');
// потрібно його заекстендити в dayJs
dayJs.extend(utc);

const { ActionToken, OAuth } = require('../dataBase');

module.exports = async () => {
    // можна передати конкретну дату від якої відштовхуватись, але потрібно враховувати різні часові пояси
    // для цього використовуємо плагін utc і апка думає що ми знаходимось в нульовій таймзоні а не в +3години
    // const previousMonth = dayJs.utc('2021-01-10').subtract(1, 'month');
    const previousMonth = dayJs.utc().subtract(1, 'month');
    // const previousMonth = dayJs().subtract(1, 'month');

    console.log(previousMonth);

    const oauthDelete = await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    const actionTokenDelete = await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });

    console.log(oauthDelete, 'oauthDelete');
    console.log(actionTokenDelete, 'actionTokenDelete');
};
