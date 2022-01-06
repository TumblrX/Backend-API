// Required validation
const {catchAsync} = require('../../errorHandler');
// Required models
const User = require('../../../models/User');
/**
 * @swagger
 * /api/blog/{blogid}/following:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve Blog's following
 *     description: This method can be used to retrieve the publicly exposed list of blogs that a blog follows
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *       - $ref: '#/components/parameters/LimitParameter'
 *       - $ref: '#/components/parameters/OffsetParameter'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     blogHandel:
 *                       type: string
 *                     blogTitle:
 *                       type: string
 *                   description: An array of short bloghandles that this blog follows
 *                 totalBlogs:
 *                   type: number
 *                   description: Total number of followed blogs
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

module.exports = catchAsync(async (req, res, next) => {
    /*
    // check if the user send the id of the blog
    const {error} = validator._idValidator.validate(req.body._id);
    if (error) return next(new AppError('The id of the blog is missing'), 400);
    // check if there is a blog with such id
    const blog = await Blog.BlogModel.findOne({_id: req.body._id});
    if (!blog) return next(new AppError('There no such blog!'), 400);
    */
    const user = await User.findOne({_id: req.user._id});

    res.status(200).send({
        status: 'success',
        numberOfFollowedBlogs: user.followingBlogs.length,
        data: [
            user.followingBlogs,
        ],
    });
});

