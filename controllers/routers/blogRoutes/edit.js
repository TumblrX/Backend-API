const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const ObjectId = require('mongoose').Types.ObjectId;
const {BlogModel} = require('../../../models/Blogs');
const {CheckImage} = require('../../blogFunctions/crudFuntions');
const bcrypt = require('bcrypt');

const globalParameters = ['backgroundColor', 'titleFont', 'stretchHeaderImage', 'accentColor', 'showAvatar',
    'showDescription', 'showHeaderImage', 'showTitle', 'titleColor', 'titleFontWeightIsBold'];
const customParameters = ['slidingHeader', 'showNavigation', 'endlessScrolling', 'syntaxHighlighting',
    'layout', 'relatedPosts'];
const customAppearance = ['truncateFeed', 'openLinksInNewWindow', 'postsPerPage', 'customTheme',
    'enableMobileInterFace'];

const formUpdateOps = async (req, blog) => {
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        // console.log('test');
        if (customAppearance.indexOf(key) !== -1) {
            updateOps['customApperance.' + key] = req.body[key];
        } else if (globalParameters.indexOf(key) !== -1) {
            updateOps['customApperance.globalParameters.' + key] = req.body[key];
        } else if (customParameters.indexOf(key) !== -1) {
            updateOps['customApperance.customParameters.' + key] = req.body[key];
        } else {
            if (key === 'isPrivate' && (req.body[key] === true || req.body[key] === 'true')) {
                console.log('test');
                if (blog.isPrimary) return 'blog is primary and cann\'t be private';
                // check if the blog is to be private then a password should be sent
                if (!(Object.keys(req.body).includes('password'))) {
                    return 'missing password';
                }
            } else if (key === 'password') {
                if (req.body['isPrivate'] && (req.body['isPrivate'] === true || req.body[key] === 'true')) {
                    // if the body has property password then hash that password
                    req.body[key] = await bcrypt.hash(req.body[key], 10);
                } else {
                    req.body[key] = 'none';
                }
            }
            updateOps[key] = req.body[key];
        }
    }
    return updateOps;
};

const editThemeLogic = catchAsync(async (req, res, next) => {
    let blog = NaN;
    if (ObjectId.isValid(req.params.id)) {
        const id = ObjectId(req.params.id);
        blog = await BlogModel.findOne({$or: [{_id: id}, {handle: req.params.id}]});
    } else {
        blog = await BlogModel.findOne({handle: req.params.id});
    }
    if (!blog) return next(new AppError('no blogs found', 400));
    if (req.files) {
        // if the user uploaded any images
        await CheckImage(req, blog);
    }
    const updateOps = await formUpdateOps(req, blog);
    if (typeof(updateOps) === 'string') return next(new AppError(updateOps, 400));
    await blog.updateOne({$set: updateOps});
    await blog.save();
    blog = await BlogModel.findOne({_id: blog._id});
    res.status(200).json({
        updatedBlog: blog,
    });
});

module.exports = editThemeLogic;
