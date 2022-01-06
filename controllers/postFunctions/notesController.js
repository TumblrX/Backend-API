const AppError = require('../utils/appError');
const catchAsync = require('../errorHandler').catchAsync;
const blogAttribution = require('../../models/Post').blogAttribution;
const Note = require('../../models/Notes');
const addIsFollowingToABlog = require('../blogFunctions/crudFuntions').addIsFollowingToABlog;
const Post = require('../../models/Post').postModel;
const {commentNotification, likeNotification} = require('../../models/Notification');
/**
 * validates a comment on a post
 * @function validateComment
 * @param {String} comment
 * @return {Boolean} true if the comment is valid else false
 */
const validateComment = (comment) => {
    return comment && comment.length > 0;
};

exports.validateComment = validateComment;
/**
 * middleware to comment on a post
 * @function comment
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.comment = catchAsync(async (req, res, next) => {
    const postId = req.params.postid;
    const comment = req.body.commentText;
    if (!validateComment(comment)) {
        return next(new AppError('Comment must be provided', 400));
    }
    const notes = await Note.findOneAndUpdate({posts: postId}, {
        $push: {
            notes: {
                type: 'comment',
                blogId: req.user.primaryBlog,
                commentText: req.body.commentText,
            },
        },
    }, {new: true});

    if (!notes) {
        return next(new AppError('post not found', 404));
    }

    res.status(200).send();
    const post = await Post.findById(postId);
    if (post) {
        commentNotification({
            blog: post.blogAttribution,
            userId: post.blogAttribution.owner,
            fromBlog: req.user.primaryBlog,
            post: post,
        }).save();
    }
});
/**
 * check if a comment was successfully deleted
 * @function canDelete
 * @param {Object} comment
 * @param {ObjectId} blog
 * @return {Boolean} returns true if comment was deleted else throws an exception.
 */
const canDelete = (comment, blog) => {
    if (!comment) {
        throw new AppError('not found', 404);
    }

    if (comment.type !== 'comment') {
        throw new AppError('bad request', 400);
    }

    if (!comment.blogId.equals(blog)) {
        throw new AppError('UnAuthorized', 401);
    }
    return true;
};
exports.canDelete = canDelete;
/**
 * middleware to delete a comment
 * @function deleteComment
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.deleteComment = catchAsync(async (req, res, next) => {
    const postId = req.params.postid;
    const commentId = req.params.commentid;
    const notes = await Note.findOne({
        posts: postId,
    });
    const comment = notes && notes.notes.find((note) => note._id == commentId);
    canDelete(comment, req.user.primaryBlog);
    await Note.findByIdAndUpdate(notes._id, {
        $pull: {
            notes: {
                _id: commentId,
            },
        },
    }, {new: true});
    // await Post.updateMany({notes: notes._id}, {
    //     $inc: {
    //         commentsCount: -1,
    //     },
    // });
    res.json(notes);
});
/**
 *  filter post notes
 * @function filterNotes
 * @param {Array} notes array of post notes
 * @param {String} mode required notes type
 * @param {Number} before
 * @return {Array} notes after being filtered
*/
const filterNotes = (notes, mode, before) => {
    let resNotes = notes;
    if (before) {
        resNotes = resNotes.filter((note) => note.createdAt <= before);
    }
    if (mode) {
        resNotes = resNotes.filter((note) => note.type === mode);
    }

    resNotes = resNotes.sort((a, b) => a.createdAt < b.createdAt);
    return resNotes;
};
exports.filterNotes = filterNotes;
/**
 * middleware to get notes on a post
 * @function getNote
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getNotes = catchAsync(async (req, res, next) => {
    const before = req.query.beforeTimestamp;
    const mode = req.query.mode;
    const postId = req.params.postid;

    const postNotes = await Note.findOne({posts: postId}).lean()
        .populate('notes.blogId', blogAttribution);
    if (!postNotes) {
        return next(new AppError('not found', 404));
    }
    const notes = filterNotes(postNotes.notes, mode, before);
    for (const note of notes) {
        addIsFollowingToABlog(note.blogId, req.user);
    }
    res.json({data: notes});
});
exports.like = catchAsync(async (req, res, next) => {
    const postId = req.params.postid;
    const notes = await Note.findOne({
        posts: postId,
    });

    if (!notes) {
        return next(new AppError('post not found', 404));
    }
    const like = notes.notes.find((note) => note.type === 'like' && note.blogId.equals(req.user.primaryBlog));
    if (like) {
        return res.json({status: 'already liked'});
    }
    await Note.findOneAndUpdate({
        posts: postId,
    }, {
        $push: {
            notes: {
                type: 'like',
                blogId: req.user.primaryBlog,
                postId: postId,
            },
        },
    }, {new: true});
    req.user.likedPosts.push(notes.posts[0]);
    await req.user.save();

    res.json({status: 'success'});

    const post = await Post.findById(postId);
    if (post) {
        likeNotification({
            blog: post.blogAttribution,
            userId: post.blogAttribution.owner,
            fromBlog: req.user.primaryBlog,
            post: post,
        }).save();
    }
});

exports.unlike = catchAsync(async (req, res, next) => {
    const postId = req.params.postid;
    const notes = await Note.findOne({
        posts: postId,
    });

    if (!notes) {
        return next(new AppError('post not found', 404));
    }
    const like = notes.notes.find((note) => note.type === 'like' && note.blogId.equals(req.user.primaryBlog));
    if (!like) {
        return res.json({status: 'already unliked'});
    }
    await Note.findOneAndUpdate({
        posts: postId,
    }, {
        $pull: {
            notes: {
                type: 'like',
                blogId: req.user.primaryBlog,
            },
        },
    }, {new: true});
    const likedPosts = [...req.user.likedPosts];
    req.user.likedPosts = likedPosts.filter((id) => notes.posts.findIndex((postid) => postid.equals(id)) === -1);
    await req.user.save();

    res.json({status: 'success'});
});
