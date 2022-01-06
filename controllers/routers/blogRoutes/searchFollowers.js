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
 *     summary: send specific blog
 *     description: This api is used to search in your followers
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - in: query
 *       name: blogHandle
 *       schema:
 *         type: string
 *       description: The handle of the blog you want to search.
 *       required: true
 *     responses:
 *       200:
 *         description: the request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: true if we find him, false otherwise
 *                 blogHandle:
 *                   type: string
 *                   description: Unique string to specify the blog
 *                 blogTitle:
 *                   type: string
 *                   description: title for your blog
 *                 avatar:
 *                   type: string
 *                   description: URL for the avatar
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * check if you are a follower or not
 * @async
 * @function isAFollower
 * @param {Object} follower1
 * @param {BlogModel} blog2
 * @returns {Boolean}
 */

const isAFollower = async (follower1, blog2) => {
    if (blog2.followedBy.includes(follower1)) {
        return true;
    } else {
        return false;
    };
};

/**
 * @async
 * @function validityOfData
 * @param {Request} req
 * @param {function} next
 * @returns {BlogModel}
 */

const validityOfData = async (req, next) => {
    // check if the user send the id of the blog
    const {error} = validator._idValidator.validate(req.query.follower);
    if (error) return next(new AppError('The id of the blog to is missing'), 400);
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.query.follower});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    return blog;
};

// eslint-disable-next-line valid-jsdoc
/**
 * check if this blog belongs to you or not
 * @function belong
 * @param {Number} index
 * @param {Object} primaryBlog
 * @param {Object} blogId
 * @return {Boolean}
 */
const belong = (index, primaryBlog, blogId) => {
    // check if the blog whose ID in the params belongs to the user making the request
    if (index !== -1 || blogId == primaryBlog ) {
        return true;
    }
    return false;
};

/**
 * check if blog is a follower or not and retrieve his data
 * @async
 * @function searchFollowersLogic
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const searchFollowersLogic = catchAsync(async (req, res, next) => {
    const blog = await validityOfData(req, next);
    let check = false;
    const blog2 = await Blog.BlogModel.findOne({_id: req.params.blogid});
    // check if the blog belongs to you
    const user = await User.findOne({_id: req.user._id});
    if (belong(user.blogs.indexOf(req.params.blogid), req.params.blogid, req.user.primaryBlog)) {
        // check if some blog is following the main blog
        const follower1 = req.query.follower;
        check = await isAFollower(follower1, blog2);
        // console.log(check);
        if (check) {
            res.json({
                'result': true,
                'id': blog._id,
                'handle': blog.handle,
                'title': blog.title,
                'avatar': blog.avatar,
            });
        } else {
            res.json({
                'result': false,
                'id': blog._id,
                'handle': blog.handle,
                'title': blog.title,
                'avatar': blog.avatar,
            });
        }
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});

module.exports = {searchFollowersLogic, isAFollower, validityOfData, belong};
