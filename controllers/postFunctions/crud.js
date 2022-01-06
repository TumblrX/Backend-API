const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');
const catchAsync = require('../errorHandler').catchAsync;
const Post = require('../../models/Post').postModel;
const Notes = require('../../models/Notes');
const {reblogNotification} = require('../../models/Notification');
const helpers = require('./functions');
const ObjectId = require('mongoose').Types.ObjectId;
const PostQueryBuilder = require('./postsRepository');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const type = file.mimetype.split('/')[0];
        cb(null, path.join('views', 'uploads', 'post', type));
    },

    filename: function(req, file, cb) {
        let ext = file.mimetype.split('/')[1];
        if (ext === '*') {
            const type = file.mimetype.split('/')[0];
            if (type === 'image') {
                ext = 'jpg';
            } else if (type === 'video') {
                ext = 'mp4';
            } else if (type === 'audio') {
                ext = 'mpeg';
            }
        }
        cb(null, `post-${Date.now()}-${req.params.blogid}.${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (type === 'audio' || type === 'video' || type === 'image') {
        cb(null, true);
    } else {
        cb(new AppError(`wrong file format`
            , 400), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});
exports.uploadFiles = upload.any();

/**
 * middleware that handles the uploaded media.
 * @async
 * @function handleUploadedMedia
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.handleUploadedMedia = catchAsync(async (req, res, next) => {
    let postStr = JSON.stringify(req.body);
    postStr = postStr.replaceAll(/"identifier":"[^"]*"/g, (str) => {
        const fileIdentifier = str.split(':')[1].replaceAll('"', '');
        if (!req.files) {
            throw new AppError(`No file with this identifier ${fileIdentifier}`, 400);
        }
        const file = req.files.find((f) => f.fieldname === fileIdentifier);
        if (!file) {
            throw new AppError(`No file with this identifier ${fileIdentifier}`, 400);
        }
        const type = file.mimetype.split('/')[0];
        return `"url":"uploads/post/${type}/${file.filename}", "media":"${file.mimetype}"`;
    });
    req.body = JSON.parse(postStr);
    next();
});

/**
 * middleware that handles the removes the protected attributes from req body.
 * @async
 * @function protectAttributes
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.protectAttributes = (req, res, next) => {
    req.body = helpers.ensureSafeCreation(req.body);
    next();
};
/**
 * middleware that handles blog rebloging a post.
 * @async
 * @function reblog
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */

exports.reblog = catchAsync(async (req, res, next) => {
    req.body.blogAttribution = req.params.blogid;
    const {reblogData} = req.body;
    if (!reblogData) {
        return next();
    }

    const newPost = Post({...req.body});
    await newPost.validate();

    const originalPost = await Post.findOne({
        _id: reblogData.parentPostId,
        state: 'published',
    });
    if (!originalPost) {
        return next(new AppError('post not found', 404));
    }
    newPost.notes = originalPost.notes;
    newPost.commentsCount = originalPost.commentsCount;
    newPost.likesCount = originalPost.likesCount;
    newPost.reblogsCount = originalPost.reblogsCount;
    newPost.trail = [...originalPost.trail, originalPost._id];
    const post = await newPost.save();

    res.status(201).json({
        status: 'success',
        post,
    });
    const notification = reblogNotification({
        blog: originalPost.blogAttribution,
        userId: originalPost.blogAttribution.owner,
        fromBlog: post.blogAttribution,
        yourPost: originalPost,
    });
    notification.save();
});

/**
 * middleware that creates a new post from request body..
 * @async
 * @function create
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
exports.create = catchAsync(async (req, res, next) => {
    if (req.body.state === 'submission') {
        throw new AppError('Submission isn\'t allowed through this route');
    }
    const post = Post({...req.body});
    await post.save();

    res.status(201).json({
        status: 'success',
        data: post,
    });
});
/**
 * middleware that updates a post from request body..
 * @async
 * @function update
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
exports.update = catchAsync(async (req, res, next) => {
    const postId = req.params.postid;
    if (req.body.state !== 'published') {
        delete req.body.state; // state can't be changed .
    } else {
        req.body.publishedOn = Math.floor(Date.now() / 1000);
    }

    const userBlogs = req.user.getAllBlogs();

    const post = await Post.findOneAndUpdate({
        _id: postId,
        blogAttribution:
        {
            $in: userBlogs,
        },
    }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!post) {
        return next(new AppError('You can\'t update this post', 403));
    }
    res.status(200).json({
        status: 'success',
        data: post,
    });
});
/**
 * middleware that deletes a post.
 * @async
 * @function delete
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
exports.delete = catchAsync(async (req, res, next) => {
    const postId = ObjectId(req.params.postid);

    const posts = await Post.aggregate([
        {
            $match: {
                $or: [
                    {_id: postId},
                    {trail: postId},
                ],
            },
        },
        {
            $set: {
                originalPost: {
                    $cond: {
                        if: {$eq: ['$_id', postId]},
                        then: true,
                        else: false,
                    },
                },
            },
        },
    ]);

    const originalPost = posts.filter((post) => post.originalPost && req.user.canWriteToBlog(post.blogAttribution))[0];
    // there is no post with this id
    if (posts.length === 0) {
        return next(new AppError('not found', 404));
    }
    // there is a post with this id, but this user can't delete it.
    if (!originalPost) {
        return next(new AppError('unauthorized', 401));
    }
    // delete the posts.
    await Post.deleteMany({_id: {$in: posts}});
    const postIds = posts.map((x) => x._id);
    await Notes.findByIdAndUpdate(originalPost.notes, {
        $pull: {
            notes: {
                postId: {$in: postIds},
            },
            posts: {
                postId: {$in: postIds},
            },
        },
    }, {new: true});
    res.status(200).json({
        status: 'success',
        data: posts,
    });
});
/**
 * add is followed boolean to post blog
 * @param {Array} posts array of {Post}
 * @param {User} user
 * @return {Array}
 */
const addIsFollowedToPostBlog = (posts, user) => {
    const addIsFollowingToABlog = require('../blogFunctions/crudFuntions').addIsFollowingToABlog;
    for (const post of posts) {
        for (const trail of post.trail) {
            addIsFollowingToABlog(trail.blogAttribution, user);
        }
        addIsFollowingToABlog(post.blogAttribution, user);
    }
    return posts;
};
exports.addIsFollowedToPostBlog = addIsFollowedToPostBlog;
/**
 * add liked boolean to post object
 * @param {Array} posts array of {Post}
 * @param {User} user
 * @return {Array}
 */
const addIsLikedToPosts = (posts, user) => {
    let likedPosts = user && user.likedPosts;
    if (!likedPosts) {
        likedPosts = [];
    }
    const newPosts = [];
    for (const post of posts) {
        const index = likedPosts.findIndex((id) => id.equals(post._id));
        const index2 = likedPosts.findIndex((id) => id.equals(post.trail[0]?._id));
        const newPost = post.toJSON();
        newPost.liked = index !== -1 || index2 !== -1;
        newPosts.push(newPost);
    }
    return newPosts;
};
exports.addIsLikedToPosts = addIsLikedToPosts;
/**
 * get post by id
 * @async
 * @function findPost
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.findPost = catchAsync(async (req, res, next) => {
    const post = await Post.findOne({_id: req.params.postid, state: 'published'}).lean();
    if (!post) {
        return next(new AppError('post not found', 404));
    }

    return res.json(post);
});
/**
 * alias route for searching the posts.
 * @async
 * @function getPostsAlias
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.getPostsAlias = (req, res, next) => {
    if (req.query.id) {
        req.params.blogid = ObjectId(req.query.id);
    }

    next();
};
/**
 * middleware that gets all posts published by a blog.
 * @async
 * @function getPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.getPosts = catchAsync(async (req, res) => {
    const queryBuilder = new PostQueryBuilder();
    let blogs = false;
    if (!req.params.blogid) {
        blogs = await require('../blogFunctions/crudFuntions').searchBlogs(req.query.q);
    }
    queryBuilder
        .search(req.query.q, blogs && blogs.map((b) => b._id))
        .writtenBy([req.params.blogid])
        .withType(req.query.type)
        .containTags(req.query.tag)
        .before(req.query.before)
        .sort('-publishedOn')
        .skip(req.query.offset)
        .limit(req.query.limit);

    let posts;
    if (req.user && req.params.blogid && req.user.canWriteToBlog(req.params.blogid)) {
        posts = await queryBuilder.exec(['published', 'private']);
    } else {
        posts = await queryBuilder.exec();
    }
    posts = addIsLikedToPosts(posts, req.user);
    posts = addIsFollowedToPostBlog(posts, req.user);
    res.json({
        status: 'success',
        data: posts,
    });
});
/**
 * middleware that gets all draft for a blog.
 * @async
 * @function draft
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.draft = catchAsync(async (req, res) => {
    const blogId = req.params.blogid;
    const posts = await Post.find({
        blogAttribution: blogId,
        state: 'draft',
    });
    res.json({data: posts});
});
