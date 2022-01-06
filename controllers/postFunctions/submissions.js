const AppError = require('../utils/appError');
const catchAsync = require('../errorHandler').catchAsync;
const Post = require('../../models/Post').postModel;
const blogAttribution = require('../../models/Post').blogAttribution;
const Blog = require('../../models/Blogs').BlogModel;
const {submissionNotification, submissionAccepted} = require('../../models/Notification');
/**
 * creates a post to be submitted to a blog
 * @async
 * @function createSubmissionPost
 * @param {Object} body post body
 * @param {String} blogId id of the blog which submitted this post
 * @param {User} user the current user
 * @return {Object}
 */
const createSubmissionPost= (body, blogId, user)=>{
    const post={
        ...body,
        blogAttribution: blogId,
        state: 'submission',
        submittedBy: user.primaryBlog,
    };
    return post;
};
exports.createSubmissionPost = createSubmissionPost;
/**
 * middleware that submits a post to a blog.
 * requires the user to be logged in
 * @async
 * @function submitPost
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.submitPost = catchAsync(async (req, res, next) => {
    const blogId = req.params.blogid;
    if (req.user.canWriteToBlog(blogId)) {
        return next(new AppError('You can\'t submit to blog you own', 401));
    }
    const postRaw=createSubmissionPost(req.body, blogId, req.user);
    const post=Post(postRaw);
    await post.validate();

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return next(new AppError('blog not found', 404));
    }

    if (!blog.settings.allowSubmission) {
        return next(new AppError('this blog doesn\'t accept submissions', 401));
    }

    await post.save();
    blog.submissions.push(post._id);
    await blog.save();

    res.status(200).json({
        status: 'success',
        data: post,
    });
    const notification = submissionNotification({
        blog: blog,
        userId: blog.owner,
        fromBlog: post.blogAttribution,
        submission: post,
    });
    notification.save();
});
/**
 * middleware that returns all the submitted posts to a blog.
 * requires the user to be the owner of this blog.
 * @async
 * @function submittedPosts
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.submittedPosts = catchAsync(async (req, res, next) => {
    const blogId = req.params.blogid;
    let {limit, offset} = req.query;
    offset = (offset || 0) * 1;
    limit = (limit || 20) * 1;

    const blog = await Blog.findById(blogId, {submissions: 1})
        .slice('submissions', [offset, limit])
        .lean()
        .populate({
            path: 'submissions',
            match: {state: 'submission'},
            populate: {
                path: 'submittedBy',
                select: blogAttribution,
            },
        });
    if (!blog) {
        return next(new AppError('blog not found', 404));
    }
    return res.status(200).json({
        status: 'success',
        data: blog.submissions,
    });
});

/**
 * middleware that deletes a submitted post.
 * requires the user to be the owner of this blog.
 * @async
 * @function deleteSubmittedPost
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.deleteSubmittedPost = catchAsync(async (req, res, next) => {
    const blogId = req.params.blogid;
    const postId = req.params.postid;

    const result = await Post.findOneAndDelete({
        blogAttribution: blogId,
        _id: postId,
        state: 'submission',
    });
    if (!result) {
        return next(new AppError('post not found', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: result,
    });
});


/**
 * middleware that accepts a submitted post.
 * requires the user to be the owner of this blog.
 * @async
 * @function acceptSubmittedPost
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {void}
 */
exports.acceptSubmittedPost = catchAsync(async (req, res, next) => {
    const blogId = req.params.blogid;
    const postId = req.params.postid;

    const result = await Post.findOneAndUpdate({
        blogAttribution: blogId,
        _id: postId,
        state: 'submission',
    }, {
        ...req.body,
        state: 'published',
    }, {
        new: true,
    });
    if (!result) {
        return next(new AppError('post not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: result,
    });
    const submittedBy = await Blog.findById(result.submittedBy).select(blogAttribution);
    submissionAccepted({
        blog: submittedBy,
        userId: submittedBy.owner,
        fromBlog: blogId,
        submission: result,
    }).save();
});
