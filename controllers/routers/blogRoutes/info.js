/* eslint-disable max-len */
// eslint-disable-next-line new-cap
// Required validation
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');


/**
 * @swagger
 * components:
 *    schemas:
 *      Blog:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            description: The display title of the blog.
 *          password:
 *            type: string
 *            description: passward of your blog.
 *          handle:
 *            type: string
 *            description: The short blog name that appears before tumblr.com in a standard blog hostname.
 *          isPrivate:
 *            type: boolean
 *            description: your blog is private or NO.
 *          isPrimary:
 *            type: boolean
 *            description: primary blog or secondary blog.
 *          description:
 *            type: string
 *            description: description of your blog that describe something you want to say.
 *          askAnon:
 *            type: boolean
 *            description: indicates whether the blog allows anonymous questions.
 *          avatar:
 *            type: string
 *            description: single sized avater of size 128, which should each have a width, height, and URL.
 *          headerImage:
 *            type: string
 *            description: the blog cover photo.
 *          posts:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/Post'
 *            description: array of posts ids that the blog contains.
 *          rebloggedPosts:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/Post'
 *            description: array of posts ids that the blog rebloged.
 *          followedBy:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/BlogAttribution'
 *            description: array of followers that the blog contains.
 *          blockedTumblrs:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/BlogAttribution'
 *            description: array of blocked blogs.
 *          timezone:
 *            type: string
 *            description: The blog's configured timezone, such as "US/Eastern", Only viewable by blog member. Partial response field ONLY.
 *          submissions:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/Post'
 *            description: array of posts ids whose status is queued, arranged from oldest to most recent.
 *          ask:
 *            type: array
 *            items:
 *              type: string
 *              $ref: '#/components/schemas/Post'
 *            description: array of asks.
 *          customAppearance:
 *            type: object
 *            allOf:
 *              - $ref: '#/components/schemas/customAppearance'
 *          settings:
 *            type: object
 *            allOf:
 *              - $ref: '#/components/schemas/settings'
 *          CreatedAt:
 *            type: date
 *            description: The date when this blog was created
 *          UpdatedAt:
 *            type: date
 *            description: The date when this blog's date was updated
 *        example:
 *          {
 *            "title": "mahdy",
 *            "handle": "yousefMostafa",
 *            "passward": "#$55555$#",
 *            "isPrivate": true,
 *            "isPrimary": true,
 *            "description": "I create this blog to have fun"
 *          }
 * /api/blog/{blogid}/info:
 *   get:
 *     tags: [Blog]
 *     summary: Get a Blog's Information
 *     description: This api is used to get general info about a specific blog
 *     parameters:
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

module.exports = catchAsync(async (req, res) => {
    // Check if there is blog with given handle
    const blog = await Blog.BlogModel.findOne({handle: req.body.handle});
    if (!blog) return next(new AppError('Blog handle NOT found', 400));
    res.status(200).send({
        status: 'success',
        data: blog,
    });
});

