const catchAsync = require('../errorHandler').catchAsync;
const AppError = require('../utils/appError');

/**
 * middleware sends a 403 response if the user can't write to a blog.
 * @async
 * @function blogAdmin
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
exports.blogAdmin = catchAsync(async (req, res, next) => {
    const blogId = req.params['blogid'];
    if (req.user.canWriteToBlog(blogId)) {
        return next();
    }
    next(new AppError('You Don\'t have access to this blog', 403));
});

/**
 * middleware sends a 403 response if the user access this blog.
 * this may happen when the user already blocked this blog or if the blog blocked this user.
 * @async
 * @function blockedBlogsFilter
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */

exports.blockedBlogsFilter = catchAsync(async (req, res, next) => {
    // TODO implement this function
    next();
});

/**
 * middleware sends a 403 response if this blog is private and password wasn't provided.
 * @async
 * @function privateBlog
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */

exports.privateBlog = catchAsync(async (req, res, next) => {
    // TODO implement this function
    next();
});
