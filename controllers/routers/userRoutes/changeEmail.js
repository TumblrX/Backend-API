const {emailValidator} = require('../../validation');
const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const {sendVerificationEmail} = require('../../userFuncitons/mailFunctions');

module.exports = catchAsync(async (req, res, next) => {
    const {error} = emailValidator.validate(req.body.email);
    if (error) return next(new AppError(error.message, 400));
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Email Already Exists',
        });
    }
    user = await User.findOne({_id: req.user._id});
    if (!req.body.password) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Wrong Password',
        });
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Wrong Password',
        });
    }
    await User.updateOne({_id: req.user._id}, {$set: {email: req.body.email, isEmailVerified: false}});
    try {
        await sendVerificationEmail(req.user._id, req.body.email);
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({
        'status': 'success',
    });
});
