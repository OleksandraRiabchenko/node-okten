const jwt = require('jsonwebtoken');
const util = require('util');

const {
    actionTokenEnum: { FORGOT_PASS, CHANGE_PASS },
    errorMessage,
    secretKeys: { ACCESS_SECRET_KEY, FORGOT_PASSWORD_SECRET_KEY, REFRESH_SECRET_KEY },
    statusCodes,
    userConstants: { ACCESS_TOKEN_TYPE },
} = require('../config');
const { ErrorHandler } = require('../errors');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS_TOKEN_TYPE) => {
        try {
            const secretKey = tokenType === ACCESS_TOKEN_TYPE ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessage.INVALID_TOKEN);
        }
    },

    generateActionToken: (actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.sign({}, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: (token, actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.verify(token, secretWord);
    }

};

function _getSecretWordForActionToken(actionType) {
    let secretWord = '';

    switch (actionType) {
        case FORGOT_PASS:
            secretWord = FORGOT_PASSWORD_SECRET_KEY;
            break;
        case CHANGE_PASS:
            secretWord = 'asdqwe';
            break;
        default:
            throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, errorMessage.WRONG_TOKEN_TYPE);
    }
    return secretWord;
}
