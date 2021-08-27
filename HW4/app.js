const express = require('express');
const mongoose = require('mongoose');

const { errorMessage, statusCode, variables: { PORT, MONGOOSE_CONNECT } } = require('./config');
const { carRouter, userRouter } = require('./routes');

const app = express();

mongoose.connect(MONGOOSE_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('ping', (req, res) => res.json('Pong'));

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCode.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message
        });
}
