const jwt = require('jsonwebtoken');
const AppError = require('./utils/appError');
const catchAsync = require('./errorHandler').catchAsync;
const User = require('../models/User');

module.exports = catchAsync(async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return next(new AppError('Access Denied!', 401));

    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) return next(new AppError('this account was deleted', 404));
    req.user = user;
    if (verified.email) {
        req.email = true;
    }
    next();
});
