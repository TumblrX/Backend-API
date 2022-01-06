/* eslint-disable max-len */
// eslint-disable-next-line new-cap
// Required validation
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');

/**
 * @swagger
 * /api/blog/{blogid}/blockhandle:
 *   post:
 *     tags: [Blog]
 *     summary: block a blog
 *     description: This api is used to block a blog
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - $ref: '#/components/parameters/BlogIdParameter'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blockedTumblelog:
 *                   type: string
 *                   description: The tumblelog to block, specified by any blog identifier
 *                 postId:
 *                   type: string
 *                   description: The anonymous post ID (asks, submissions) to block
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200OK'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * this function is used to block blog
 * @async
 * @function blockHandle
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

exports.blockHandle = catchAsync(async (req, res, next) => {
    // check if the user send the id of the blog to block
    const handle = req.body.handle;
    if (!handle) return next(new AppError('The handle of the blog to block is missing'), 400);
    const blog = await Blog.BlogModel.findOne({handle: req.body.handle});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    const id = blog._id;
    if (id == req.user.primaryBlog) return next(new AppError('You can\'t block your own primary blog'));
    // check if there is a blog with such id
    const user = await User.findOne({_id: req.user._id});
    let user2 = await User.findOne({_id: blog.owner});
    // check if you have the authority
    if ((user.blogs.indexOf(req.params.blogid) != -1) || (req.user.primaryBlog == req.params.blogid)) {
        if (req.user.primaryBlog == req.params.blogid) {
            // console.log('hhh');
            // ckeck if it is one of my blogs
            if ((user.blogs.indexOf(id) == -1) || (req.user.primaryBlog == req.params.blogid)) {
                // if i follow the blog which i want to block then remove it from followers
                // console.log('hhh4');
                if (user.followingBlogs.includes(id)) {
                    // console.log('hhh3');
                    await Blog.BlogModel.updateOne({
                        _id: id,
                    }, {
                        $pull: {followedBy: req.user.primaryBlog},
                    });
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: id},
                    });
                    await User.updateOne({
                        _id: req.user._id,
                    }, {
                        $pull: {followingBlogs: id},
                    });
                }
                if (user2.followingBlogs.includes(req.params.blogid)) {
                    console.log('hhh3');
                    await Blog.BlogModel.updateOne({
                        _id: id,
                    }, {
                        $pull: {followedBy: req.user.primaryBlog},
                    });
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: id},
                    });
                    await User.updateOne({
                        _id: blog.owner,
                    }, {
                        $pull: {followingBlogs: req.params.blogid},
                    });
                }
                // blocking the blog
                if (user.blockedBlogs.includes(id)) return next(new AppError('you already blocked that user'));
                await Blog.BlogModel.updateOne({
                    _id: req.params.blogid,
                }, {
                    $push: {blockedTumblrs: id},
                });
                await Blog.BlogModel.updateOne({
                    _id: id,
                }, {
                    $push: {blockingMe: req.params.blogid},
                });
                await User.updateOne({
                    _id: req.user._id,
                }, {
                    $push: {blockedBlogs: id},
                });
                const result = 'You BLOCKED ' + blog.handle;
                res.json({
                    'result': result,
                    'id': blog._id,
                });
            } else {
                return next(new AppError('you cant block one of your blogss!', 400));
            }
        } else {
            // check if they have same primary blog
            const blog1 = await Blog.BlogModel.findOne({_id: id});
            const blog2 = await Blog.BlogModel.findOne({_id: req.params.blogid});
            // console.log(blog1.owner);
            // console.log(blog2.owner);
            if (`${blog1.owner}` == `${blog2.owner}`) {
                return next(new AppError('you cant block one of your blogs!!', 400));
            } else {
                // block this blog
                let blog = await Blog.BlogModel.findOne({_id: req.params.blogid});
                if (blog.blockedTumblrs.includes(id)) return next(new AppError('you already blocked that user'));
                if (blog.followedBy.includes(id)) {
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: id},
                    });
                }
                user2 = await User.findOne({_id: blog1.owner});
                if ((blog1.isPrimary) && (user2.followingBlogs.includes(req.params.blogid))) {
                    await User.updateOne({
                        _id: blog1.owner,
                    }, {
                        $pull: {followingBlogs: req.params.blogid},
                    });
                }
                await Blog.BlogModel.updateOne({
                    _id: req.params.blogid,
                }, {
                    $push: {blockedTumblrs: id},
                });
                await Blog.BlogModel.updateOne({
                    _id: id,
                }, {
                    $push: {blockingMe: req.params.blogid},
                });
                blog = await Blog.BlogModel.findOne({_id: id});
                const result = 'You BLOCKED ' + blog.handle;
                res.json({
                    'result': result,
                    'id': blog._id,
                });
            }
        }
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});
