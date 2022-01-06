/* eslint-disable max-len */
// eslint-disable-next-line new-cap
// Required validation
const validator = require('../../validation');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const Post = require('../../../models/Post').postModel;
const User = require('../../../models/User');

/**
 * @swagger
 * /api/blog/{blogid}:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve a Blog's information
 *     description: This method can be used to retrieve blog information and posts that blog contains
 *     parameters:
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogHandle:
 *                   type: string
 *                   description: Unique string to specify the blog
 *                 blogTitle:
 *                   type: string
 *                   description: title for your blog
 *                 avatar:
 *                   type: string
 *                   description: URL for the avatar
 *                 description:
 *                   type: string
 *                   description: inforamtion about your blog
 *                 containPosts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                   description: posts that blog contain
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
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
 * this function is used to retrieve blog
 * @async
 * @function retrieveBlog
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

const retrieveBlog = catchAsync(async (req, res, next) => {
    // validating the id
    const {error} = validator._idValidator.validate(req.params.blogid);
    if (error) return next(new AppError('The id of the blog is missing'), 400);
    const {error2} = validator._idValidator.validate(req.params.retrievingid);
    if (error2) return next(new AppError('The id of the blog to retrieve is missing'), 400);
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.params.blogid});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    const blog2 = await Blog.BlogModel.findOne({_id: req.params.retrievingid});
    if (!blog2) return next(new AppError('There no such blog!'), 400);
    const user = await User.findOne({_id: req.user._id});
    if (belong(user.blogs.indexOf(req.params.blogid), req.user.primaryBlog, req.params.blogid)) {
        if (blog2.blockedTumblrs.includes(req.params.blogid)) {
            res.status(403).json('this tumblir blocked you');
        }
        if (blog.blockedTumblrs.includes(req.params.retrievingid)) {
            res.status(403).json('you blocked this tumblir');
        }
        const posts = await Post
            .find({blogAttribution: blog2._id, state: 'published'})
            .sort({publishedOn: 'desc'})
            .limit(10);
        res.status(200).json({
            'id': blog2._id,
            'handle': blog2.handle,
            'title': blog2.title,
            'avatar': blog2.avatar,
            'isAvatarCircle': blog2.isAvatarCircle,
            'headerImage': blog2.headerImage,
            'description': blog2.description,
            'posts': posts,
        });
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});

module.exports = {retrieveBlog};
