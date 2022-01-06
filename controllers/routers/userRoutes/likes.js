/**
 * @swagger
 * /api/user/likes:
 *   get:
 *     tags: [User]
 *     summary: Retrieve a User's Likes
 *     description: This api is used to get user likes
 *     parameters:
 *       - $ref: '#/components/parameters/Auth'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Offset'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likedPosts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                          - $ref: '#/components/schemas/Post'
 *                   description: An array of posts liked by the user
 *                 likedCount:
 *                   type: number
 *                   description: Total number of liked posts
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

const {catchAsync} = require('../../errorHandler');
const Note = require('../../../models/Notes');
const Post = require('../../../models/Post').postModel;

module.exports = catchAsync(async (req, res) => {
    const blogId = req.user.primaryBlog;
    const limit = (req.query.limit || 20) * 1;
    const offset = (req.query.offset || 0) * 1;
    const postIds = await Note.aggregate([
        {
            $match: {
                'notes.type': 'like',
                'notes.blogId': blogId,
            },
        },
        {
            $unwind: {
                path: '$notes',
            },
        },
        {
            $match: {
                'notes.type': 'like',
            },
        },
        {
            $set: {
                postId: '$notes.postId',
            },
        },
        {
            $project: {
                postId: 1,
            },
        },
        {
            $skip: offset,
        },
        {
            $limit: limit,
        },
    ]);
    const posts = await Post.find({_id: {$in: postIds.map((post) => post.postId)}});
    res.send({
        likePosts: posts,
        likedCount: posts.length,
    });
});
