module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),

    AUTHORIZATION: 'Authorization',
    ACCESS_TOKEN_TYPE: 'access_token',
    REFRESH_TOKEN_TYPE: 'refresh_token',

    MIMETYPE: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    },
    MAX_SIZE: {
        PHOTO: 5 * 1024 * 1024
    },
    AWS_LINK: 'amazonaws.com/',
    USERS: 'users',
};
