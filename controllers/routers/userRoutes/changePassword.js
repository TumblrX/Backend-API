const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const {updatePasswordWithToken,
    updateUserPassword} = require('../../userFuncitons/userFunctions');
const {passwordValidator} = require('../../validation');
const {getPasswordToken} = require('../../userFuncitons/redisFunctions');


const changePasswordEmail = async function(req, res, next) {
    const password = req.body.password;
    const id = req.body.id;
    const token = req.body.token;
    let result = null;
    result = await getPasswordToken(id);
    if (result && token == result) {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                'status': 'Failed',
                'message': 'User Doesn\'t Exist',
            });
        }
        if ('error' in passwordValidator.validate(password)) {
            return res.status(401).json({
                'status': 'Failed',
                'message': 'Invalid New Password',
            });
        }
        await updatePasswordWithToken(id, password);
        return res.status(200).json({
            'status': 'Success',
            'message': 'Password Changed',
        });
    } else {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Invalid Token',
        });
    }
};

const changePasswordJWT = async function(req, res, next) {
    const password = req.body.password;
    const oldPassword = req.body.oldPassword;
    const verified = await jwt.verify(req.header('Authorization'), process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'User Doesn\'t Exist',
        });
    }
    if (!oldPassword) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Enter Old Password',
        });
    }
    const validPass = await bcrypt.compare(oldPassword, user.password);
    if (!validPass) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Wrong Old Password',
        });
    }
    if ('error' in passwordValidator.validate(password)) {
        return res.status(401).json({
            'status': 'Failed',
            'message': 'Invalid New Password',
        });
    }
    await updateUserPassword(verified._id, password);
    return res.status(200).json({
        'status': 'Success',
        'message': 'Password Changed',
    });
};

module.exports = catchAsync(async (req, res, next) => {
    if (req.header('Authorization')) {
        await changePasswordJWT(req, res, next);
    } else {
        await changePasswordEmail(req, res, next);
    }
});
