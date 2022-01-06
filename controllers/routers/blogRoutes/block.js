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
 * this function is used to block blog
 * @async
 * @function block
 * @param {Request} req
 * @param {Respone} res
 * @param {function} next
 */

exports.block = catchAsync(async (req, res, next) => {
    // check if the user send the id of the blog to block
    const {error} = validator._idValidator.validate(req.body._id);
    if (error) return next(new AppError('The id of the blog to block is missing'), 400);
    if (req.body._id == req.user.primaryBlog) return next(new AppError('You can\'t block your own primary blog'));
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.body._id});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    const user = await User.findOne({_id: req.user._id});
    let user2 = await User.findOne({_id: blog.owner});
    // console.log(user.followingBlogs.includes(req.body._id));
    // console.log(user);
    // check if you have the authority
    // console.log('hhh1  ' + user.blogs.indexOf(req.params.blogid));
    if ((user.blogs.indexOf(req.params.blogid) != -1) || (req.user.primaryBlog == req.params.blogid)) {
        if (req.user.primaryBlog == req.params.blogid) {
            // console.log('hhh');
            // ckeck if it is one of my blogs
            if ((user.blogs.indexOf(req.body._id) == -1) || (req.user.primaryBlog == req.params.blogid)) {
                // if i follow the blog which i want to block then remove it from followers
                // console.log('hhh4');
                if (user.followingBlogs.includes(req.body._id)) {
                    // console.log('hhh3');
                    await Blog.BlogModel.updateOne({
                        _id: req.body._id,
                    }, {
                        $pull: {followedBy: req.user.primaryBlog},
                    });
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: req.body._id},
                    });
                    await User.updateOne({
                        _id: req.user._id,
                    }, {
                        $pull: {followingBlogs: req.body._id},
                    });
                }
                if (user2.followingBlogs.includes(req.params.blogid)) {
                    console.log('hhh3');
                    await Blog.BlogModel.updateOne({
                        _id: req.body._id,
                    }, {
                        $pull: {followedBy: req.user.primaryBlog},
                    });
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: req.body._id},
                    });
                    await User.updateOne({
                        _id: blog.owner,
                    }, {
                        $pull: {followingBlogs: req.params.blogid},
                    });
                }
                // blocking the blog
                if (user.blockedBlogs.includes(req.body._id)) return next(new AppError('you already blocked that user'));
                await Blog.BlogModel.updateOne({
                    _id: req.params.blogid,
                }, {
                    $push: {blockedTumblrs: req.body._id},
                });
                await Blog.BlogModel.updateOne({
                    _id: req.body._id,
                }, {
                    $push: {blockingMe: req.params.blogid},
                });
                await User.updateOne({
                    _id: req.user._id,
                }, {
                    $push: {blockedBlogs: req.body._id},
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
            const blog1 = await Blog.BlogModel.findOne({_id: req.body._id});
            const blog2 = await Blog.BlogModel.findOne({_id: req.params.blogid});
            // console.log(blog1.owner);
            // console.log(blog2.owner);
            if (`${blog1.owner}` == `${blog2.owner}`) {
                return next(new AppError('you cant block one of your blogs!!', 400));
            } else {
                // block this blog
                let blog = await Blog.BlogModel.findOne({_id: req.params.blogid});
                if (blog.blockedTumblrs.includes(req.body._id)) return next(new AppError('you already blocked that user'));
                if (blog.followedBy.includes(req.body._id)) {
                    await Blog.BlogModel.updateOne({
                        _id: req.params.blogid,
                    }, {
                        $pull: {followedBy: req.body._id},
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
                    $push: {blockedTumblrs: req.body._id},
                });
                await Blog.BlogModel.updateOne({
                    _id: req.body._id,
                }, {
                    $push: {blockingMe: req.params.blogid},
                });
                blog = await Blog.BlogModel.findOne({_id: req.body._id});
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
