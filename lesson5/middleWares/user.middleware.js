const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidator = require('../validators/user.validator');

// middleware приймає 3 аргумента, обов'язково next, він нічого не респонсає тільки передає ПУСТИЙ next(),
// все що записано в next() сприйається як помилка
module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            // const user = await User.findById(user_id).select('_id email ');
            // const user = await User.findById(user_id).select('-email -role');
            // const user = await User.findById(user_id).select('+password');
            // lean() - перетворює об'єкт монги в читаємий json-формат
            // const user = await User.findById(user_id).lean();
            const user = await User.findById(user_id);

            console.log(user);

            if (!user) {
                throw new ErrorHandler(418, 'user not found');
            }
            // прокидуємо дані із міддлвари в контролер за допомогою мутування ріквесту
            req.user = user;
            req.testParam = 'Hello';

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            // Використовувати звичайний find не гуд, бо перевіряє весь масив даних і повертає масив, тому краще findOne
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(409, `Email ${email} is already exist`);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            console.log(value);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
