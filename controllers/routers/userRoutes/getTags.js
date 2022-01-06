const {catchAsync} = require('../../errorHandler');
const Post = require('../../../models/Post').postModel;
const {getTagsPhotosFromPostsWithTags} = require('../../userFuncitons/userFunctions');

module.exports = catchAsync(async (req, res) => {
    const postsWithTags = await Post.find({
        'tags': {$exists: true, $not: {$size: 0}},
        'content.type': 'image', 'state': 'published',
    }).select(['content',
        'tags', '-blogAttribution', '-_id', '-trail']).limit(100);
    tagsPhotos = await getTagsPhotosFromPostsWithTags(postsWithTags);
    return res.status(200).json({
        tagsPhotos,
    });
});

