module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021-okten',
    PORT: process.env.PORT || 5000,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'parol',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com/',

    AWS_S3_NAME: process.env.AWS_S3_NAME || 'owu-bucket-2021',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'eu-north-1',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'info',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || 'info',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',

    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '123qweASD!@%$'
};
