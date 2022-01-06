const {catchAsync} = require('../../errorHandler');

module.exports = catchAsync(async (req, res) => {
    const user = req.user;
    user.blogs.push(user.primaryBlog);
    return res.status(200).json({
        'id': req.user.id,
        'name': user.username,
        'email': user.email,
        'isEmailVerified': user.isEmailVerified,
        'primary_blog': user.primaryBlog,
        'following': (user.followingBlogs ? user.followingBlogs.length : 0),
        'followingTags': user.followingTags,
        'default_post_format': 'html',
        'likes': (user.likedPosts ? user.likedPosts.length : 0),
        'blogs': user.blogs,
        'settings': user.settings,
    });
});
