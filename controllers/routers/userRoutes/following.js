const {catchAsync} = require('../../errorHandler');
const {addFriendsToBlogs} = require('../../userFuncitons/userFunctions');
const Blog = require('../../../models/Blogs').BlogModel;

module.exports = catchAsync(async (req, res) => {
    let followingBlogs = await Blog.find({_id: {$in: req.user.followingBlogs}})
        .select(['_id', 'title', 'handle', 'avatar']);
    followingBlogs = await addFriendsToBlogs(req.user, followingBlogs);
    return res.status(200).json({
        'numberOfFollowing': req.user.followingBlogs.length,
        followingBlogs,
    });
});

