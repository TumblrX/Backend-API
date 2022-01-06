/* eslint-disable max-len */
// eslint-disable-next-line new-cap
// Required validation
const validator = require('../../validation');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');

/**
 * @swagger
 * /api/blog/{blogid}/blocks:
 *   delete:
 *     tags: [Blog]
 *     summary: Unblock a blog
 *     description: This api is used to unblock a blog
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
 *                   description: The tumblelog whose block to remove, specified by any blog identifier
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
 * this function is used to unblock blog
 * @async
 * @function unBlock
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

exports.unBlock = catchAsync(async (req, res, next) => {
    // check if the user send the id of the blog to unblock
    const {error} = validator._idValidator.validate(req.body._id);
    if (error) return next(new AppError('The id of the blog to unblock is missing'), 400);
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.body._id});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    const user = await User.findOne({_id: req.user._id});
    if (user.blogs.indexOf(req.params.blogid) != -1 || req.params.blogid == req.user.primaryBlog) {
        // check if it is a primary blog
        if (req.user.primaryBlog == req.params.blogid) {
            // check if the user already not blocking that user
            if (!user.blockedBlogs.includes(req.body._id)) return next(new AppError('you already unblocked that user'));
            await User.updateOne({
                _id: req.user._id,
            }, {
                $pull: {blockedBlogs: req.body._id},
            });
            await Blog.BlogModel.updateOne({
                _id: req.params.blogid,
            }, {
                $pull: {blockedTumblrs: req.body._id},
            });
            await Blog.BlogModel.updateOne({
                _id: req.body._id,
            }, {
                $pull: {blockingMe: req.params.blogid},
            });
            const result = 'You removed ' + blog.handle + ' from blocking list';
            res.json({
                'result': result,
                'id': blog._id,
            });
        } else {
            // check if it is already blocked
            const blogTemp = await Blog.BlogModel.findOne({_id: req.params.blogid});
            if (!blogTemp.blockedTumblrs.includes(req.body._id)) return next(new AppError('you already unblocked that user'));
            await Blog.BlogModel.updateOne({
                _id: req.params.blogid,
            }, {
                $pull: {blockedTumblrs: req.body._id},
            });
            await Blog.BlogModel.updateOne({
                _id: req.body._id,
            }, {
                $pull: {blockingMe: req.params.blogid},
            });
            const result = 'You removed ' + blog.handle + ' from blocking list';
            res.json({
                'result': result,
                'id': blog._id,
            });
        }
    } else {
        return next(new AppError('this blog dosent belong to you!', 400));
    }
});
