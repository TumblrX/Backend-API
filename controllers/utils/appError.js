/** Class representing a AppError that should be shown to the user. */
class AppError extends Error {
    /**
     * @param {string} message the  error message
     * @param {number} statusCode response status code defaults to 500
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode||500;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
