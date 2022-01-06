// Required validation
const validator = require('../../validation');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
// Required models
const Blog = require('../../../models/Blogs');
/**
 * @swagger
 * /api/blog/{blogid}/followedby:
 *   get:
 *     tags: [Blog]
 *     summary: Check If Followed By Blog
 *     description: This method can be used to check if one of your blogs is followed by another blog.
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - $ref: '#/components/parameters/BlogIdParameter'
 *     - in: query
 *       name: query
 *       schema:
 *         type: string
 *       description: The name of the blog that may be following your blog
 *       required: true
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  followedBy:
 *                   type: boolean
 *                   description: True when the queried blog follows your blog, false otherwise.
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

module.exports = catchAsync(async (req, res, next) => {
    // check if the user send the id of the blog
    const {error} = validator._idValidator.validate(req.body._id);
    if (error) return next(new AppError('The id of the blog to is missing'), 400);
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.body._id});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    let check = false;
    const blogg = await Blog.BlogModel.findOne({_id: req.user.primaryBlog});
    // check if some blog in following the main blog
    if (blogg.followedBy.includes(req.body._id)) {
        check = true;
    }
    if (check) {
        res.send(blog.handle + ' follows you');
    } else {
        res.send(blog.handle + ' dosent follow you ');
    }
});
