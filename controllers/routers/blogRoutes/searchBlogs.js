const searchBlogs = require('../../blogFunctions/crudFuntions').searchBlogs;
const catchAsync = require('../../errorHandler').catchAsync;
const AppError = require('../../utils/appError');

/**
 * @swagger
 * /api/blog/search:
 *   get:
 *     tags: [Blog]
 *     summary: Search for a blog
 *     description: This method can be used to search for a blog
 *     parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - in: query
 *               name: blogslimit
 *               schema:
 *                 type: number
 *               description: The number of results to return
 *               default: 20
 *               required: false
 *             - in: query
 *               name: startindex
 *               schema:
 *                 type: number
 *               default: 0
 *               required: false
 *             - in: query
 *               name: q
 *               schema:
 *                 type: string
 *               required: true
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  blogs:
 *                      type: array
 *                      items:
 *                         type: object
 *                         allOf:
 *                              - $ref: '#/components/schemas/Blog'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

module.exports = catchAsync(async (req, res, next) => {
    if (!req.query.q) {
        return next(new AppError('q is required', 400));
    }

    res.json({blogs: await searchBlogs(req.query.q, req.query.blogslimit, req.query.startindex)});
});
