/**
 * @swagger
 * /api/inbox:
 *   get:
 *     tags: [Blog]
 *     summary: get submissions people sent to you
 *     description: This api is used to get submissions people sent to you then accept or not
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submissions:
 *                   type: object
 *                   description: array of submission information
 *                   items:
 *                     type: object
 *                     properties:
 *                       postId:
 *                         type: string
 *                         description: The unique identifier of the post to submit
 *               example:
 *                 {
 *                   "submissions": [
 *                              {
 *                                "postId": "666300036497522688",
 *                              }
 *                            ]
 *                 }
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */


module.exports = router;
