const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const Blog = require('../../../models/Blogs').BlogModel;

module.exports = catchAsync(async (req, res, next) => {
    const result = await User.findOne({username: req.body.username});
    const result2 = await Blog.findOne({handle: req.body.username});
    if (result || result2) {
        res.status(200).send({
            status: 'Success',
            message: 'Username exists',
        });
    } else {
        res.status(404).send({
            status: 'Warning',
            message: 'Username doesn\'t exists',
        });
    }
});
