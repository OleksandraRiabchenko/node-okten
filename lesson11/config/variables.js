module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021-okten',
    PORT: process.env.PORT || 5000,

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    FORGOT_PASS_SECRET_KEY: process.env.FORGOT_PASS_SECRET_KEY || 'forgotWord',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    AWS_S3_NAME: process.env.AWS_S3_NAME || '',
    AWS_S3_REGION: process.env.AWS_S3_REGION || '',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_NAME_REGION || '',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
};
