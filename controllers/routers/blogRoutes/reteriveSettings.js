const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {catchAsync} = require('../../errorHandler');
const ObjectId = require('mongoose').Types.ObjectId;
const AppError = require('../../utils/appError');
const {BlogModel} = require('../../../models/Blogs');

const reteriveSettingsLogic = catchAsync(async (req, res, next) => {
    // check if the sent blog id belongs to that user
    const blogId = ObjectId(req.params.id);
    if (!req.user.primaryBlog.equals(blogId) && !req.user.blogs.includes(blogId)) {
        return next(new AppError('you don\'t that blog', 400));
    }
    const blog = await BlogModel.findOne({_id: blogId})
        .select({
            title: true,
            description: true,
            headerImage: true,
            avatar: true,
            isAvatarCircle: true,
            customApperance: {
                globalParameters: {
                    backgroundColor: true,
                    titleColor: true,
                    accentColor: true,
                    showHeaderImage: true,
                    stretchHeaderImage: true,
                    showAvatar: true,
                    showTitle: true,
                    showDescription: true,
                },
                customParameters: {
                    slidingHeader: true,
                    showNavigation: true,
                    endlessScrolling: true,
                    syntaxHighlighting: true,
                    relatedPosts: true,
                },
            },
        });
    const data = {};
    data.title = blog.title;
    data.description = blog.description;
    data.headerImage = blog.headerImage;
    data.avatar = blog.avatar;
    data.avatarShapeCircle = blog.isAvatarCircle;
    data.bgColor = blog.customApperance.globalParameters.backgroundColor;
    data.titleColor = blog.customApperance.globalParameters.titleColor;
    data.accentColor = blog.customApperance.globalParameters.accentColor;
    data.showHeaderImage = blog.customApperance.globalParameters.showHeaderImage;
    data.stretchHeaderImage = blog.customApperance.globalParameters.stretchHeaderImage;
    data.showAvatar = blog.customApperance.globalParameters.showAvatar;
    data.showTitle = blog.customApperance.globalParameters.showTitle;
    data.showDescription = blog.customApperance.globalParameters.showDescription;
    data.userNewPostTypes = true;
    data.slidingHeader = blog.customApperance.customParameters.slidingHeader;
    data.showNavigation = blog.customApperance.customParameters.showNavigation;
    data.endlessScrolling = blog.customApperance.customParameters.endlessScrolling;
    data.syntaxHighlighting = blog.customApperance.customParameters.syntaxHighlighting;
    data.relatedPosts = blog.customApperance.customParameters.relatedPosts;
    res.status(200).json({
        data: data,
    });
});

router.route('/reterive-settings/:id').get(verifyToken, reteriveSettingsLogic);

module.exports = router;
