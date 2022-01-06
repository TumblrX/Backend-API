const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');

module.exports = catchAsync(async (req, res, next) => {
    const result = await User.findOne({email: req.body.email});
    if (result) {
        res.status(200).send({
            status: 'Success',
            message: 'Email exists',
        });
    } else {
        res.status(404).send({
            status: 'Warning',
            message: 'Email doesn\'t exists',
        });
    }
});
