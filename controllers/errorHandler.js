//* ** ********************************* *****
//* ** all error handling should go here *****
//* ** ********************************* *****


const AppError = require('./utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

exports.handleUnfoundError = (req, res, next) => {
    next(new AppError(`Can\'t find ${req.originalUrl}`, 404));
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB =(err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
    });
};
const sendErrorProd = (err, req, res) => {
    // can be sent to the user
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: `Something Went Wrong!`,
        });
    }
};


exports.handleErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = {...err};
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(error, req, res);
    }
};

/**
 * This Function handles errors that's thrown through async function passing it
 *  to the next()  so that express error  handler handles that error and decides
 * whether to send that error to the user or not.
 *
 * so when you use it you will not need try catch block.
 * @param {function} fn function that may throw error
 * @return {function} another function with error handling
 */
exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            if (res.headersSent) { // error in sending notification
                console.error(err);
            } else {
                next(err);
            }
        });
    };
};
