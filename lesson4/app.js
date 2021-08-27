const express = require('express');
// mongoose необхідно зареквайрити
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();
// ПОТРІБНО ЗРОБИТИ КОННЕКТ, АДРЕСА - mongodb://localhost:27017/назва_бази
mongoose.connect('mongodb://localhost:27017/apr-2021-okten');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter } = require('./routes');

app.get('ping', (req, res) => res.json('Pong'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
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
