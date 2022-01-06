const Post = require('../../models/Post').postModel;
const {catchAsync} = require('../errorHandler');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {getRandomArbitrary} = require('../blogFunctions/exploreFunctions');
const {addIsLikedToPosts} = require('../postFunctions/crud');

// Trending
const customVerifyToken = async (token) => {
    // check if the user is logged in
    // if so return the user document from database
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    return user;
};
/**
 * function to retrieve the posts with the most number of comments, likes and reblogs
 * the function returns an array of trending posts
 * @async
 * @function retrieveTrendingPosts
 * @param {int} startIndex
 * @param {object} query
 * @param {array} userBlogs
 * @return {Array}
 */
const retrieveTrendingPosts = async (startIndex, query, userBlogs = []) => {
    const trendingPosts = await Post
        .find({$and: [query, {blogAttribution: {$nin: userBlogs}}]})
        .sort({likesCount: 'desc', commentsCount: 'desc', reblogsCount: 'desc'})
        .skip(startIndex)
        .limit(10);
        // .populate('notes');
    return trendingPosts;
};

const checkFollowing = (user, posts) => {
    for (let i = 0; i < posts.length; i++) {
        // check if the user is following the blog shareing these posts
        // if following set the flage "alreadyFollow" to true
        // else set the flag to false
        if (user && user.followingBlogs.includes(posts[i].blogAttribution._id)) {
            posts[i]['alreadyFollow'] = true;
        } else {
            posts[i]['alreadyFollow'] = false;
        }
    }
    return posts;
};

const exploreLogic = async (req, query) => {
    let user;
    if (req.header('Authorization')) {
        user = await customVerifyToken(req.header('Authorization'));
    }
    let trendingPosts;
    if (user) {
        const userBlogs = user.blogs;
        userBlogs.push(user.primaryBlog);
        trendingPosts = await retrieveTrendingPosts(parseInt(req.params.startIndex), query, userBlogs);
        trendingPosts = checkFollowing(user, trendingPosts);
        trendingPosts = addIsLikedToPosts(trendingPosts, user);
    } else {
        trendingPosts = await retrieveTrendingPosts(parseInt(req.params.startIndex), query);
    }
    return trendingPosts;
};

/**
 * middleware returns an arrays for the tending posts
 * @async
 * @function getTrendingPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingPosts = (catchAsync(async (req, res, next) => {
    const trendingPosts = await exploreLogic(req, {state: 'published'});
    if (!trendingPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingPosts,
    });
}));

// For-You
/**
 * function to retrieve the random posts
 * the function returns an array of randomly selected posts
 * @async
 * @function retrieveForYouPosts
 * @param {int} startIndex
 * @param {array} userBlogs
 * @return {Array}
 */
const retrieveForYouPosts = async (startIndex, userBlogs) => {
    const count = await Post.estimatedDocumentCount();
    const skipRecords = getRandomArbitrary(0, count - startIndex, startIndex);
    const posts = await Post
        .find({$and: [{state: 'published'}, {blogAttribution: {$nin: userBlogs}}]})
        .skip(skipRecords)
        .limit(10);
    return posts;
};
const getForYouPosts = (catchAsync(async (req, res, next) => {
    const userBlogs = req.user.blogs;
    userBlogs.push(req.user.primaryBlog);
    let forYouPosts = await retrieveForYouPosts(parseInt(req.params.startIndex), userBlogs);
    if (!forYouPosts) return next(new AppError('no posts found', 500));
    forYouPosts = checkFollowing(req.user, forYouPosts);
    res.status(200).json({
        'for-youPosts': addIsLikedToPosts(forYouPosts),
    });
}));

// explore-text
/**
 * middleware returns an arrays for the tending posts of type text ONLY
 * @async
 * @function getTrendingTextPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingTextPosts = (catchAsync(async (req, res, next) => {
    const trendingTextPosts = await exploreLogic(req, {state: 'published', content: {$elemMatch: {type: 'text'}}});
    if (!trendingTextPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingTextPosts,
    });
}));

// explore-photos
/**
 * middleware returns an arrays for the tending posts of type PHOTO only
 * @async
 * @function getTrendingPhotoPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingPhotoPosts = (catchAsync(async (req, res, next) => {
    const trendingPhotoPosts = await exploreLogic(req, {state: 'published', content: {$elemMatch: {type: 'image'}}});
    if (!trendingPhotoPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingPhotoPosts,
    });
}));

// explore-Video
/**
 * middleware returns an arrays for the tending posts of type VIDEO only
 * @async
 * @function getTrendingVideoPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingVideoPosts = (catchAsync(async (req, res, next) => {
    const trendingVideoPosts = await exploreLogic(req, {state: 'published', content: {$elemMatch: {type: 'video'}}});
    if (!trendingVideoPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingVideoPosts,
    });
}));

// explore-ask
/**
 * middleware returns an arrays for the tending posts of type ASK only
 * @async
 * @function getTrendingAskPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingAskPosts = (catchAsync(async (req, res, next) => {
    const trendingAskPosts = await exploreLogic(req, {state: 'published', content: {$elemMatch: {type: 'ask'}}});
    if (!trendingAskPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingAskPosts,
    });
}));

// explore-audio
/**
 * middleware returns an arrays for the tending posts of type AUDIO only
 * @async
 * @function getTrendingAudioPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getTrendingAudioPosts = (catchAsync(async (req, res, next) => {
    const trendingAudioPosts = await exploreLogic(req, {state: 'published', content: {$elemMatch: {type: 'audio'}}});
    if (!trendingAudioPosts) return next(new AppError('no posts found!', 400));
    res.status(200).json({
        'trendingPosts': trendingAudioPosts,
    });
}));

module.exports = {getTrendingPosts, getTrendingTextPosts, getTrendingPhotoPosts,
    getTrendingVideoPosts, getForYouPosts, retrieveTrendingPosts,
    getTrendingAskPosts, getTrendingAudioPosts, customVerifyToken};

