const {catchAsync} = require('../../errorHandler');
const {getUserBlogs} = require('../../userFuncitons/userFunctions');

module.exports = catchAsync(async (req, res) => {
    let blogs = await getUserBlogs(req.user);
    blogs = blogs.map((x) => {
        return {
            '_id': x._id,
            'title': x.title,
            'password': x.password,
            'handle': x.handle,
            'isPrivate': x.isPrivate,
            'isPrimary': x.isPrimary,
            'description': x.description,
            'askAnon': x.askAnon,
            'avatar': x.avatar,
            'isAvatarCircle': x.isAvatarCircle,
            'headerImage': x.headerImage,
        };
    });
    return res.status(200).json(blogs);
});

