// jwt потрібно зареквайрити після інсталяції
const jwt = require('jsonwebtoken');
const util = require('util');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variables');
const ErrorHandler = require('../errors/ErrorHandler');

// jwt.verify приймає асинхронну ф-цію, тому для цього нам потрібно з util затягнути метод промісифікації ф-цій promisify()
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

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(401, 'Invalid token');
        }
    }
};
// В сервісах не потрібно використовувати нічого з req, res, body
