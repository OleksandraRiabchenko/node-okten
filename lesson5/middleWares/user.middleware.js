const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');

// middleware приймає 3 аргумента, обов'язково next, він нічого не респонсає тільки передає ПУСТИЙ next(),
// все що записано в next() сприйається як помилка
module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            // const deletedUser = await User.findByIdAndDelete(user_id);

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
    }
};
