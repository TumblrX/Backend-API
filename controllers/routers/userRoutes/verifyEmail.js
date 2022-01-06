const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const {setEmailVerified} = require('../../userFuncitons/userFunctions');
const {getVerifyToken} = require('../../userFuncitons/redisFunctions');

module.exports = catchAsync(async (req, res, next) => {
    const id = req.body.id;
    const token = req.body.token;
    const result = await getVerifyToken(id);
    if (token == result) {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                'status': 'Failed',
                'message': 'User Doesn\'t Exist',
            });
        }
        setEmailVerified(id);
        res.status(200).json({
            'status': 'Success',
            'message': 'Email Verified',
        });
    } else {
        res.status(401).json({
            'status': 'Failed',
            'message': 'Invalid Token',
        });
    }
});
