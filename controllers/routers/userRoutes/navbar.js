const {catchAsync} = require('../../errorHandler');
const Notes = require('../../../models/Notes');
const {getPostsPerBlog} = require('../../userFuncitons/userFunctions');

module.exports = catchAsync(async (req, res, next) => {
    const postsCount = await getPostsPerBlog(req.user);
    const followingCount = req.user.followingBlogs.length;
    const likesCount = await Notes.countDocuments({'notes.blogId': req.user.primaryBlog});
    return res.status(200).json({
        postsCount,
        followingCount,
        likesCount,
    });
});
