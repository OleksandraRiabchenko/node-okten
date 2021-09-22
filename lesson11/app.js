const express = require('express');
// mongoose необхідно зареквайрити
const mongoose = require('mongoose');
// необхідно зареквайрити helmet - захист, використовується на проді,і використовуємо в use як ф-цію
const helmet = require('helmet');
// необхідно зареквайрити cors (іде на прод), нижче вказуємо умови використання
const cors = require('cors');
// необхідно зареквайрити наш express-fileupload
const expressFileUpload = require('express-fileupload');
// необхідно зареквайрити, mdlwr, яка обмежує кількість запитів в одиницю часу
const expressRateLimit = require('express-rate-limit');

// щоб подружити наш проект з дотенв-файлом потрібно після інсталювання законфіжити
require('dotenv').config();

const { ALLOWED_ORIGINS, DB_CONNECTION_URL, PORT } = require('./config/variables');
const ErrorHandler = require('./errors/ErrorHandler');
// реквайрим cron з папки і викликаємо ф-цію під час запуску апки app.listen...
const cronJobs = require('./cron');

const app = express();
// ПОТРІБНО ЗРОБИТИ КОННЕКТ, АДРЕСА - mongodb://localhost:27017/назва_бази
mongoose.connect(DB_CONNECTION_URL);

app.use(helmet());
// в cors умовою origin - тіло ф-ції _configureCors, яка описана знизу
app.use(cors({ origin: _configureCors }));
// вказуємо умови
app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000, // час на який розраховані запити
    max: 1000 //  кіькість запитів за windowMs
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

// необхідно зареквайрити morgan (для регистрації HTTP-запросов) за умови
// morgan викор-ться тільки при розробці, при деплої на прод, цього робити не потрібно, бо вивід в консоль дуже довгий процес
if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
    // dev - це інший dev, не такий як в умові if, цей дев показує як нам буде відображатись інфа - є в опис в npm

    // з документації, можна вибрати що саме буде відображатись в консолі
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

const { authRouter, userRouter } = require('./routes');

app.get('ping', (req, res) => res.json('Pong'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    // щоб побачити шлях до папки де запускаємо проект можна використати process.cwd()
    // console.log(process.cwd());
    // щоб побачити всі змінні які зберігаються в .env використовуємо process.env
    // console.log(process.env);
    console.log('App listen', PORT);
    // запускаємо cron, відпрацьовує кожні 5 сек, бо ми стільки вказали
    cronJobs();
    // т.як defaultData.util - це Self-Invoking Functions, ми можемо її просто зареквайрити і апка її одразу виконає
    require('./utils/defaultData.util');
});

// Кастомна ф-ція обробник помилок, приймає обов'язкові 4 аргумента саме в такій послідовності: next передає дані далі
function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}

// origin - звідки до нас ходять(localhost3000,4200 і т.п.)
function _configureCors(origin, callback) {
    // массив доменів (хостів), яким дозволено доступ
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        // errror -first, data -last
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(403, 'CORS not allowed', false));
    }

    return callback(null, true);
}
