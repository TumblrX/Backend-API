// Required validation
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');

/**
 * function that check if there is a blog with the given data
 * @async
 * @function validityOfData
 * @param {Request} req
 * @param {fFunction} next
 * @return {BlogModel}
 */
const validityOfData = async (req, next) => {
    const blog = await Blog.BlogModel.findOne({_id: req.params.blogid});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    return blog;
};


/**
 * check if this blog belongs to you or not
 * @function belong
 * @param {Number} index
 * @param {Object} primaryBlog
 * @param {Object} blogId
 * @returns {Boolean}
 */

const belong = (index, primaryBlog, blogId) => {
    // check if the blog whose ID in the params belongs to the user making the request
    if (index !== -1 || blogId == primaryBlog ) {
        return true;
    }
    return false;
};

/**
 * return the settings of a blog
 * @async
 * @function getSettings
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const getSettings = catchAsync(async (req, res, next) => {
    const blog = await validityOfData(req, next);
    const user = await User.findOne({_id: req.user._id});
    // console.log(user.blogs.indexOf(req.params.blogid));
    if (belong(user.blogs.indexOf(req.params.blogid), req.user.primaryBlog, req.params.blogid)) {
        if (blog.isPrimary) {
            res.status(200).json({
                'id': blog._id,
                'handle': blog.handle,
                'title': blog.title,
                'avatar': blog.avatar,
                'shareLikes': blog.settings.shareLikes,
                'shareFollowing': blog.settings.shareFollowing,
                'replies': blog.settings.replies,
                'allowSubmission': blog.settings.allowSubmission,
                'allowAsk': blog.settings.allowAsk,
                'messaging': blog.settings.messaging,
                'hideFromSearch': blog.settings.hideFromSearch,
            });
        } else {
            res.status(200).json({
                'id': blog._id,
                'handle': blog.handle,
                'title': blog.title,
                'avatar': blog.avatar,
                'replies': blog.settings.replies,
                'allowSubmission': blog.settings.allowSubmission,
                'allowAsk': blog.settings.allowAsk,
                'messaging': blog.settings.messaging,
                'hideFromSearch': blog.settings.hideFromSearch,
                'activatePassward': blog.settings.activatePassward,
                'blogPassword': blog.password,
                'blogAvatar': blog.settings.blogAvatar,
            });
        }
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});


module.exports = {getSettings, validityOfData, belong};
