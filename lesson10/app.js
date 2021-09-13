const express = require('express');
// mongoose необхідно зареквайрити
const mongoose = require('mongoose');
// необхідно зареквайрити наш express-fileupload
const expressFileUpload = require('express-fileupload');

// щоб подружити наш проект з дотенв-файлом потрібно після інсталювання законфіжити
require('dotenv').config();

const { DB_CONNECTION_URL, PORT } = require('./config/variables');

const app = express();
// ПОТРІБНО ЗРОБИТИ КОННЕКТ, АДРЕСА - mongodb://localhost:27017/назва_бази
mongoose.connect(DB_CONNECTION_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

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
