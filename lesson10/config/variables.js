module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021-okten',
    PORT: process.env.PORT || 5000,

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    FORGOT_PASS_SECRET_KEY: process.env.FORGOT_PASS_SECRET_KEY || 'forgotWord',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
};
