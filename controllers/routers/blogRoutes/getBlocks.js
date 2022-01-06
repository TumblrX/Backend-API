// Required validation
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');
/**
 * @swagger
 * /api/blog/{blogid}/blocks:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve Blog's Blocks
 *     description: Get the blogs that the requested blog is currently blocking.
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *       - $ref: '#/components/parameters/LimitParameter'
 *       - $ref: '#/components/parameters/OffsetParameter'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  blockedTumblelogs:
 *                   type: array
 *                   description: Blog objects that are blocked.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: the short name of the blog
 *                       title:
 *                         type: string
 *                         description: the title of the blog
 *                       description:
 *                         type: string
 *                         description: Reason of blocking
 *               example:
 *                 {
 *                   "blockedTumblelogs": [
 *                              {
 *                                "name": "joe",
 *                                "title": "Spammy Joe",
 *                                "description": "Posting things you don't really care for",
 *                              }
 *                            ]
 *
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

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
 * function that return the data of some Tumblrs
 * @function retreiveDate
 * @param {BlogModel} blogs
 * @return {BlogModel}
 */

const retreiveDate = (blogs) => {
    const blog = blogs.blockedTumblrs.map((x) => {
        return {
            'id': x._id,
            'handle': x.handle,
            'title': x.title,
            'avatar': x.avatar,
        };
    });
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
 * return the blocked tumblirs of a blog
 * @async
 * @function getBlocksLogic
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const getBlocksLogic = catchAsync(async (req, res, next) => {
    const blog = await validityOfData(req, next);
    const user = await User.findOne({_id: req.user._id});
    // console.log(user.blogs.indexOf(req.params.blogid));
    if (belong(user.blogs.indexOf(req.params.blogid), req.user.primaryBlog, req.params.blogid)) {
        let blogs = await Blog.BlogModel.findOne({_id: req.params.blogid}).select('blockedTumblrs').populate({
            path: 'blockedTumblrs',
        });
        blogs = retreiveDate(blogs);
        res.status(200).json({
            status: 'success',
            numberOfBlockedTumblirs: blog.blockedTumblrs.length,
            blogs,
        });
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});

module.exports = {getBlocksLogic, retreiveDate, validityOfData, belong};
