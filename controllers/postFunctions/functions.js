//*  Represents post attributes that the user can't change
const protectedAttributes = ['publishedOn', 'notes', 'trail', 'reblogsCount',
    'likesCount', 'commentsCount', 'blogAttribution', 'submittedBy', '_id', 'createdAt', 'updatedAt'];

/**
 * removes the post attributes that the user can't change
 * @function ensureSafeCreation
 * @param {Object} post
 * @return {Object} post after deleting protected attributes.
 */
exports.ensureSafeCreation = (post) => {
    for (const attr of protectedAttributes) {
        delete post[attr];
    }
    return post;
};
