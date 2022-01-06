/* eslint-disable max-len */
// eslint-disable-next-line new-cap
// Required validation
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');

module.exports = catchAsync(async (req, res) => {
    // Check if there is blog with given handle
    const blog = await Blog.BlogModel.findOne({handle: req.body.handle});
    if (!blog) return next(new AppError('Blog handle NOT found', 400));
    res.status(200).send({
        status: 'success',
        data: blog.avatar,
    });
});

