const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const {canCreateUser, sendJWT} = require('../../userFuncitons/userFunctions');
const {getPayloadFromGoogle, createUserFromPayload} = require('../../userFuncitons/googleFunctions');

module.exports = catchAsync(async (req, res) => {
    if (!req.body.id_token) {
        return next(new AppError('Please enter id_token', 400));
    }
    const payload = await getPayloadFromGoogle(req.body.id_token);
    let user = await User.findOne({email: payload.email});
    if (!user) {
        await createUserFromPayload(payload);
        user = await User.findOne({email: payload.email});
        req.user = user;
        return sendJWT(req, res);
    }
    req.user = user;
    return sendJWT(req, res);
});
