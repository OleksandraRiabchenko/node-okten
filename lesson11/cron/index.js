const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('*/5 * * * * *', () => {
        console.log(`Cron started at ${new Date().toISOString()}`);
        removeOldTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
