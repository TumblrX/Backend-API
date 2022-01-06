/**
 * @swagger
 * /api/blog/{blogid}/likes:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve Blog's Likes
 *     description: This api is used to get blog likes
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *       - $ref: '#/components/parameters/LimitParameter'
 *       - $ref: '#/components/parameters/OffsetParameter'
 *       - in: query
 *         name: before
 *         schema:
 *           type: integer
 *         description: Retrieve posts liked before the specified timestamp
 *         required: false
 *       - in: query
 *         name: after
 *         schema:
 *           type: integer
 *         description: Retrieve posts liked after the specified timestamp
 *         required: false
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
 *                     type: string
 *                   description: An array of post ids (posts liked by the user)
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
