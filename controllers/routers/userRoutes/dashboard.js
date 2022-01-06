const {catchAsync} = require('../../errorHandler');
const {getForYouPosts} = require('../../userFuncitons/exploreFunctions');
const {addIsLikedToPostsJSON,
    getPostsForUser} = require('../../userFuncitons/userFunctions');

module.exports = catchAsync(async (req, res, next) => {
    const blogs = req.user.followingBlogs;
    blogs.push(req.user.primaryBlog);
    const posts = await getPostsForUser(blogs, req.user.followingTags, req.query['page'], req.query['limit']);
    if (posts.length != 0) {
        return res.status(200).json({
            'posts': addIsLikedToPostsJSON(posts, req.user),
        });
    } else {
        getForYouPosts(req, res, next);
    }
});
