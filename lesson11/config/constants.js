module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',

// size photo < 5Mb (переводимо в кіло потім в байти)
    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    }
};
