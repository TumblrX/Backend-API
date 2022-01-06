const {catchAsync} = require('../errorHandler');
const AppError = require('../utils/appError');
const Blog = require('../../models/Blogs');

const getRandomArbitrary = (min, max, offset) => {
    return offset + Math.ceil(Math.random() * (max - min) + min);
};

/**
 * function to form a query to be used in other explore blog functions
 * @function formQuery
 * @param {object} user
 * @return {object}
 */
const formQuery = (user) => {
    let query = {};
    if (user.followingBlogs.length > 0 && user.blogs.length > 0) {
        // remove the blogs that the user has and already follow form the seacrh query
        query = {$and: [{_id: {$nin: user.followingBlogs}}, {_id: {$nin: user.blogs}}, {_id: {$ne: user.primaryBlog}}]};
    } else if (user.followingBlogs.length > 0) {
        // remove the user's primary blog and the blogs already follewd from the search query
        query = {$and: [{_id: {$nin: user.followingBlogs}}, {_id: {$ne: user.primaryBlog}}]};
    } else if (user.blogs.length > 0) {
        // remove the user's blogs from the qeury search
        query = {$and: [{_id: {$nin: user.blogs}}, {_id: {$ne: user.primaryBlog}}]};
    } else {
        query = {_id: {$ne: user.primaryBlog}};
    }
    return query;
};

// trending
/**
 * function to retrieve the blogs with the most number of followers
 * the function returns an array of trending blogs
 * @async
 * @function retrieveTrendingBlogs
 * @param {int} startIndex
 * @param {object} user
 * @return {Array}
 */
const retrieveTrendingBlogs = async (startIndex, user) => {
    const query = formQuery(user);
    const trendingBlogs = await Blog.BlogModel
        .find(query)
        .sort({followedBy: 'desc'})
        .skip(startIndex)
        .limit(4)
        .select({
            owner: true,
            title: true,
            handle: true,
            avatar: true,
            isAvatarCircle: true});
    return trendingBlogs;
};

/**
 * middleware returns an array of trending blogs
 * @async
 * @function getTrendingBlogs
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingBlogs = (catchAsync(async (req, res, next) => {
    const trendingBlogs = await retrieveTrendingBlogs(parseInt(req.params.startIndex), req.user);
    if (!trendingBlogs) return next(new AppError('no posts found', 500));
    res.status(200).json({
        'trendingBlogs': trendingBlogs,
    });
}));

// for-you
/**
 * function to retrieve the blogs which are reandomly selected
 * the function returns an array of 4 randomly selected blogs
 * @async
 * @function retrieveForYouBlogs
 * @param {int} startIndex
 * @param {object} user
 * @return {Array}
 */
const retrieveForYouBlogs = async (startIndex, user) => {
    const query = formQuery(user);
    const count = await Blog.BlogModel.estimatedDocumentCount();
    const skipRecords = getRandomArbitrary(0, count - startIndex, startIndex);
    const blogs = await Blog.BlogModel
        .find(query)
        .skip(skipRecords)
        .limit(4)
        .select({
            owner: true,
            title: true,
            handle: true,
            avatar: true,
            isAvatarCircle: true,
        });
    return blogs;
};

/**
 * middleware returns an array of trending blogs
 * @async
 * @function getForYouBlogs
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getForYouBlogs = (catchAsync(async (req, res, next) => {
    const forYouBlogs = await retrieveForYouBlogs(parseInt(req.params.startIndex), req.user);
    if (!forYouBlogs) return next(new AppError('no blogs found', 500));
    res.status(200).json({
        'forYouBlogs': forYouBlogs,
    });
}));

module.exports = {getTrendingBlogs, retrieveTrendingBlogs, getForYouBlogs, retrieveForYouBlogs, getRandomArbitrary};
