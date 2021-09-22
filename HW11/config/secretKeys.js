module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'first_key',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'forgotWord',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'second_key'
};
