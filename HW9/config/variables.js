module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021-okten',
    PORT: process.env.PORT || 5000,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'parol',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com/'
};
