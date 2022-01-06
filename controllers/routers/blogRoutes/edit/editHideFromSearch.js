// Required validation
const {catchAsync} = require('../../../errorHandler');
const AppError = require('../../../utils/appError');
// Required models
const Blog = require('../../../../models/Blogs');
const User = require('../../../../models/User');

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
 * Is used to edit HideFromSearch
 * @async
 * @function editHideFromSearch
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const editHideFromSearch = catchAsync(async (req, res, next) => {
    const blog = await validityOfData(req, next);
    const user = await User.findOne({_id: req.user._id});
    if (belong(user.blogs.indexOf(req.params.blogid), req.user.primaryBlog, req.params.blogid)) {
        blog.settings.hideFromSearch = req.body.hideFromSearch;
        await blog.save();
        res.status(200).json({
            status: 'success',
        });
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});


module.exports = {editHideFromSearch, validityOfData, belong};
