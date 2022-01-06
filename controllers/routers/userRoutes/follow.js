const bcrypt = require('bcrypt');
const validator = require('../../validation');
const mongoose = require('mongoose');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');
const {followNotification} = require('../../../models/Notification');
const {getArraysIntersection} = require('../../blogFunctions/crudFuntions');

/**
 * function to check if the blog already follows blog whose id is sent in the request body
 * return false if already follow
 * return true
 * @function checkFollow
 * @param {Array} followingBlogs
 * @param {ObjectId} _id
 * @return {Boolean}
 */
const checkFollow = (followingBlogs, _id) => {
    if (followingBlogs.includes(_id)) {
        return false;
    }
    return true;
};

/**
 * function to check if the blog to follow is private, if so then a password must be sent
 * return error message incase of error
 * return fine if no error
 * @async
 * @function isPrivate
 * @param {Object} blog
 * @param {String} password
 * @return {String}
 */
const isPrivate = async (blog, password) => {
    if (blog.isPrivate) {
        if (!password) return 'Blog is private, please provide the password!';
        const validPass = await bcrypt.compare(password, blog.password);
        if (!validPass) return 'Wrong password';
    }
    return 'fine';
};

/**
 * function to update the user makeing the request accordingly and update the blog being followed accordingly
 * @async
 * @function updateFollowingFollowers
 * @param {ObjectId} _id
 * @param {ObjectId} primaryBlog
 * @param {ObjectId} userId
 */
const updateFollowingFollowers = async (_id, primaryBlog, userId) => {
    await Blog.BlogModel.updateOne({
        _id: _id,
    }, {
        $push: {followedBy: primaryBlog},
    });
    await User.updateOne({
        _id: userId,
    }, {
        $push: {followingBlogs: _id},
    });
};

/**
 * function to check if there exits a blod with such id
 * return the blog if found
 * else return empty object
 * @async
 * @function checkFound
 * @param {ObjectId} blogId
 * @return {Object}
 */
const checkFound = async (blogId) => {
    const blog = await Blog.BlogModel.findOne({_id: blogId});
    return blog;
};

/**
 * middleware that allows user to follow other blogs.
 * @async
 * @function followLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const followLogic = catchAsync(async (req, res, next) => {
    let blog = NaN;
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
        // the send argument is not _id but handle
        blog = await Blog.BlogModel.findOne({handle: req.body._id});
    } else {
        // check if the user send the id of the blog to follow
        const {error} = validator._idValidator.validate(req.body._id);
        if (error) return next(new AppError('The id of the blog to follow is missing', 400));
        blog = await checkFound(mongoose.Types.ObjectId(req.body._id));
    }
    // check if there is a blog with such id
    if (!blog) return next(new AppError('There no such blog!', 400));
    // check if the user is trying to follow his primary blog
    if (blog._id.equals(req.user.primaryBlog)) {
        return next(new AppError('You can\'t follow your own primary blog', 400));
    }
    // if private, password is required
    const message = await isPrivate(blog, req.body.password);
    if (message !== 'fine') return next(new AppError(message, 400));
    // check if the user already follows that user
    if (!checkFollow(req.user.followingBlogs, blog._id)) {
        return next(new AppError('Already follows that blog', 400));
    }
    // check if you are in the blocked list of that user
    const userBlogs = req.user.blogs;
    userBlogs.push(req.user.primaryBlog);
    const intersection = getArraysIntersection(blog.blockedTumblrs, userBlogs);
    if (intersection) {
        return next(new AppError('you were blocked by that tumblr, you can not follow it', 400));
    }
    // remove the blog to follow from blocked tumblrs if found
    await Blog.BlogModel.updateMany({owner: req.user._id}, {$pull: {blockedTumblrs: {$in: [blog._id]}}});
    await Blog.BlogModel.updateMany({$pull: {blockingMe: {$in: userBlogs}}});
    await req.user.updateOne({$pull: {blockedBlogs: blog._id}});
    await updateFollowingFollowers(blog._id, req.user.primaryBlog, req.user._id);
    res.status(200).json({
        message: 'You started following ' + blog.handle,
    });
    followNotification({
        blog,
        userId: blog.owner,
        fromBlog: req.user.primaryBlog,
    }).save();
});

module.exports = {followLogic, isPrivate, checkFollow};
