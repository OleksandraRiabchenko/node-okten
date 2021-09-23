const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');

require('dotenv').config();

const { errorMessage, statusCodes, variables: { ALLOWED_ORIGINS, DB_CONNECTION_URL, PORT } } = require('./config');
const { authRouter, carRouter, userRouter } = require('./routes');
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');

const app = express();

mongoose.connect(DB_CONNECTION_URL);

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);

    cronJobs();
    require('./utils/defaultData.util');
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message
        });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
