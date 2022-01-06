const validator = require('../../validation');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const mongoose = require('mongoose');
const Blog = require('../../../models/Blogs');
const User = require('../../../models/User');
const followFunctions = require('./follow');

/**
 * function to update the user makeing the request accordingly and update the blog being followed accordingly
 * this function removes the blog id sent in the request from user following
 * also removes the user's primary blog id from the followed in the blog whose id is sent in the request body
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
        $pull: {followedBy: primaryBlog},
    });
    await User.updateOne({
        _id: userId,
    }, {
        $pull: {followingBlogs: _id},
    });
};

/**
 * middleware that allows user to unfollow other blogs.
 * @async
 * @function followLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
module.exports = catchAsync(async (req, res, next) => {
    // check if the user send the id of the blog to unfollow
    const {error} = validator._idValidator.validate(req.body._id);
    if (error) return next(new AppError('The id of the blog to unfollow is missing', 400));
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findById({_id: mongoose.Types.ObjectId(req.body._id)});
    if (!blog) return next(new AppError('There no such blog!', 400));
    // check if the user already not following that blog
    if (followFunctions.checkFollow(req.user.followingBlogs, blog._id)) {
        return next(new AppError('you already don\'t follow that user', 400));
    }
    await updateFollowingFollowers(mongoose.Types.ObjectId(req.body._id), req.user.primaryBlog, req.user._id);
    res.send('You removed ' + blog.handle + ' from followings');
});
