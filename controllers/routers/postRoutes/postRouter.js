/* eslint-disable new-cap */

/**
 * @swagger
 *  tags:
 *     name: Post
 *     description: Post's related APIs
 */


/**
 * @swagger
 *  components:
 *   parameters:
 *       PostTagParameter:
 *             name: tag
 *             in: query
 *             type: array
 *             items:
 *                 type: string
 *             description: get posts that contains ALL of the given tags
 *       PostIdPathParameter:
 *             name: postid
 *             in: path
 *             type: string
 *             description: post id to get a specific post
 *             required: true
 *       BlogIdParameter:
 *             name: blogid
 *             in: path
 *             type: string
 *             description: blog id to get a specific blog
 *             required: true
 *       PostIdQueryParameter:
 *             name: id
 *             in: query
 *             type: string
 *             description: post id to get a specific post
 *       BlogIdQueryParameter:
 *             name: id
 *             in: query
 *             type: string
 *             description: blog id to get a specific blog
 *       LimitParameter:
 *             name: limit
 *             in: query
 *             type: integer
 *             default: 20
 *       OffsetParameter:
 *             name: offset
 *             in: query
 *             type: integer
 *             default: 0
 *       PostBeforeParameter:
 *             name: before
 *             in: query
 *             type: integer
 *             description: |
 *                   Returns posts published earlier
 *                   than a specified Unix timestamp, in seconds.
 *       PostTypeParameter:
 *             name: type
 *             in: query
 *             type: string
 *             description: |
 *                     The type of post to return. Specify one of the following: text, quote,
 *                     link, answer, video, audio, photo, chat
 *       Authorization:
 *         name: Authorization
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *
 *       beforeTimestamp:
 *         name: beforeTimestamp
 *         in: query
 *         description: Fetch results created before this timestamp,
 *               This is a unix timestamp.
 *         type: integer
 *       Query:
 *         name: q
 *         in: query
 *         description: query parameter
 *         type: string
 */
/**
 * @swagger
 *  components:
 *       PostsArrayResponse:
 *          type: object
 *          properties:
 *              data:
 *                type: array
 *                description: array of Posts
 *                items:
 *                  type: object
 *                  allOf:
 *                   - $ref: '#/components/schemas/Post'
 *                   - type: object
 *                     properties:
 *                          liked:
 *                              type: boolean
 *                              description: |
 *                                     Indicates if a user has already liked a post or not
 *                                     Exists only if the request is fully authenticated with OAuth.
 */

/**
 * @swagger
 *  /api/post:
 *    get:
 *      tags: [Post]
 *      summary: Search Published Posts.
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/PostTagParameter'
 *             - $ref: '#/components/parameters/BlogIdQueryParameter'
 *             - $ref: '#/components/parameters/PostIdQueryParameter'
 *             - $ref: '#/components/parameters/PostTypeParameter'
 *             - $ref: '#/components/parameters/PostBeforeParameter'
 *             - $ref: '#/components/parameters/OffsetParameter'
 *             - $ref: '#/components/parameters/LimitParameter'
 *             - $ref: '#/components/parameters/Query'
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                            type: array
 *                            description: array of Posts
 *                            items:
 *                              type: object
 *                              allOf:
 *                               - $ref: '#/components/schemas/Post'
 *                               - type: object
 *                                 properties:
 *                                      liked:
 *                                          type: boolean
 *                                          description: |
 *                                                 Indicates if a user has already liked a post or not
 *                                                 Exists only if the request is fully authenticated with OAuth.
 *          400:
 *             $ref: '#/components/responses/400BadRequest'
 *          401:
 *             $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/

/**
 * @swagger
 *  /api/post/{postid}:
 *    get:
 *      tags: [Post]
 *      summary: Fetching a Post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      allOf:
 *                         - $ref: '#/components/schemas/Post'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *    delete:
 *      tags: [Post]
 *      summary: Deleting a Post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            $ref: '#/components/responses/200OK'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          404:
 *            $ref: '#/components/responses/404NotFound'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *    put:
 *      tags: [Post]
 *      summary: Editing a Post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/schemas/PostAttribution'
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            $ref: '#/components/responses/200OK'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/

/**
 * @swagger
 *  /api/post/{postid}/like:
 *      post:
 *        tags: [Post]
 *        summary: Like a post
 *        description: This api is used to like a post
 *        parameters:
 *                - $ref: '#/components/parameters/Authorization'
 *                - $ref: '#/components/parameters/PostIdPathParameter'
 *        responses:
 *          200:
 *            $ref: '#/components/responses/200OK'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *
 *      delete:
 *        tags: [Post]
 *        summary: Unlike a post
 *        description: This api is used to unlike a post
 *        parameters:
 *                - $ref: '#/components/parameters/Authorization'
 *                - $ref: '#/components/parameters/PostIdPathParameter'
 *        responses:
 *          200:
 *            $ref: '#/components/responses/200OK'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 */

const express = require('express');
const postController = require('../../postFunctions/crud');
const verifyToken = require('../../verifyToken');
const verifyTokenWithoutBlock = require('../../verifyTokenWithoutBlock');
const router = express.Router();
router.route('/')
    .get(
        verifyTokenWithoutBlock,
        postController.getPostsAlias,
        postController.getPosts,
    );
router.route('/:postid')
    .get(
        verifyTokenWithoutBlock,
        postController.findPost,
    )
    .put(
        verifyToken,
        postController.uploadFiles,
        postController.handleUploadedMedia,
        postController.protectAttributes,
        postController.update,
    ).delete(
        verifyToken,
        postController.delete,
    );


module.exports = router;
