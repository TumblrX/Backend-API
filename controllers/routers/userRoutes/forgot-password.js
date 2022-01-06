const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const User = require('../../../models/User');
const {sendNewPasswordEmail} = require('../../userFuncitons/mailFunctions');
const {setNewPassword} = require('../../userFuncitons/userFunctions');
const randomString = require('../../utils/RandomString');

module.exports = catchAsync(async (req, res, next) => {
    const user = await User.find({email: req.body.email});
    if (user.length == 0) {
        return next(new AppError('Access Denied!', 401));
    }
    const password = randomString(10);
    await setNewPassword(req.body.email, password);
    const result = await sendNewPasswordEmail(req.body.email, password);
    if (result.accepted.includes(req.body.email)) {
        return res.status(200).json({status: 'Success', message: 'Email sent successfully'});
    } else {
        return res.status(500).json({status: 'Failed', message: 'Couldn\'t send email'});
    }
});
