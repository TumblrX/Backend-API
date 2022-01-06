// Required validation
const validator = require('../../validation');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');
/**
 * @swagger
 * /api/blog/{blogid}/followers:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve a Blog's Followers
 *     description: This method can be used to retrieve the publicly exposed list of blogs that a blog follows
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
 *                 totalUsers:
 *                   type: number
 *                   description: The number of users currently following the blog.
 *                 users:
 *                   type: array
 *                   description: followers
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user's name on tumblr.
 *                       following:
 *                         type: boolean
 *                         description: Whether the caller is following the user.
 *                       url:
 *                         type: string
 *               example:
 *                 {
 *                   "totalUsers": 2684,
 *                   "users": [
 *                              {
 *                                "name": "mahdy",
 *                                "following": true,
 *                              }
 *                            ]
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

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

const retreiveDate = (followingBlogs, blogs) => {
    const blog = blogs.followedBy.map((x) => {
        // check if the user follows back that blog
        let flag = false;
        if (followingBlogs.includes(x._id)) {
            flag = true;
        }
        return {
            '_id': x._id,
            'handle': x.handle,
            'title': x.title,
            'avatar': x.avatar,
            'showAvatar': x.customApperance.globalParameters.showAvatar,
            'isAvatarCircle': x.isAvatarCircle,
            'alreadyFollow': flag,
        };
    });
    return blog;
};

/**
 * this function is used to retrieve followers of given blog
 * @async
 * @function followersLogic
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const followersLogic = catchAsync(async (req, res, next) => {
    // validate the id
    const {error} = validator._idValidator.validate(req.params.blogid);
    if (error) return next(new AppError('The id of the blog is missing'), 400);
    // check if there is a blog with such id
    const blog = await validityOfData(req, next);
    const user = await User.findOne({_id: req.user._id});
    if (belong(user.blogs.indexOf(req.params.blogid), req.user.primaryBlog, req.params.blogid)) {
        let blogs = await Blog.BlogModel.findOne({_id: req.params.blogid}).select('followedBy').populate({
            path: 'followedBy',
        });
        blogs = retreiveDate(user.followingBlogs, blogs);
        res.status(200).json({
            status: 'success',
            numberOfFollowers: blog.followedBy.length,
            blogs,
        });
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});

module.exports = {followersLogic, belong, validityOfData, retreiveDate};
