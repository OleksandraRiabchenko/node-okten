const { userConstants: { MIMETYPE, MAX_SIZE }, statusCodes, errorMessage } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (size > MAX_SIZE.PHOTO) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILE_IS_BIG);
            }

            if (!MIMETYPE.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_FILE_FORMAT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
