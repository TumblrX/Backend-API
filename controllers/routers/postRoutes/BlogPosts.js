

/**
 * @swagger
 *  /api/blog/{blogid}/posts:
 *    get:
 *      tags: [Post]
 *      summary: Retrieve Published Posts by a blog
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/PostTagParameter'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/PostIdQueryParameter'
 *             - $ref: '#/components/parameters/PostTypeParameter'
 *             - $ref: '#/components/parameters/PostBeforeParameter'
 *             - $ref: '#/components/parameters/OffsetParameter'
 *             - $ref: '#/components/parameters/LimitParameter'
 *             - $ref: '#/components/parameters/Query'
 *
 *
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/PostsArrayResponse'
 *          400:
 *             $ref: '#/components/responses/400BadRequest'
 *          401:
 *             $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *    post:
 *      tags: [Post]
 *      summary: Create/Reblog a Post
 *      description: |
 *              # User Uploaded Media
 *              This route allows you to create posts (and reblogs).
 *
 *               In order to support user uploaded media(photos, videos, etc.),
 *
 *               the creation and edit routes also support a multi - part form request
 *
 *               where the first part contains the JSON body and subsequent parts contain media data.
 *
 *               The Content - Type: multipart / form - data header must be used in this case.
 *
 *               To specify which media data pertains to which block,
 *
 *               we use a unique identifier in the JSON body and this identifier is used as the key in the form data.
 *              ```json
 *               {
 *                  "content": [
 *                      {
 *                          "type": "image",
 *                          "media":  "image/jpeg",
 *                          "identifier": "some-identifier",
 *                          "width": 250,
 *                          "height": 200
 *                      }
 *                  ]
 *              }
 *              ```
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/schemas/PostAttribution'
 *                        - type: object
 *                          properties:
 *                              reblogData:
 *                                  type: object
 *                                  description: use it to reblog a post
 *                                  properties:
 *                                      parentPostId:
 *                                          type: string
 *                                          description: The unique public post ID being reblogged.
 *
 *      responses:
 *          201:
 *            $ref: '#/components/responses/201Created'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 *  /api/blog/{blogid}/posts/draft:
 *    get:
 *      tags: [Post]
 *      summary: Retrieve all draft Posts
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
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
 *                                $ref: '#/components/schemas/Post'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/

/**
 * @swagger
 *  /api/blog/{blogid}/posts/submission:
 *    post:
 *      tags: [Post]
 *      summary: submit a post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/PostCreator'
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *          404:
 *            $ref: '#/components/responses/404NotFound'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *
 *    get:
 *      tags: [Post]
 *      summary: Retrieve Submission Posts
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/OffsetParameter'
 *             - $ref: '#/components/parameters/LimitParameter'
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
 *                                $ref: '#/components/schemas/Post'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/
/**
 * @swagger
 *  /api/blog/{blogid}/posts/submission/{postid}:
 *    post:
 *      tags: [Post]
 *      summary: Accept a Submission
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/PostCreator'
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *          404:
 *            $ref: '#/components/responses/404NotFound'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 *
 *    delete:
 *      tags: [Post]
 *      summary: Delete a Submission
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: The request has succeeded
 *          404:
 *            $ref: '#/components/responses/404NotFound'
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/
const express = require('express');
const postController = require('../../postFunctions/crud');
const submissionController = require('../../postFunctions/submissions');
const blogProtector = require('../../blogFunctions/protectBlog');
const verifyToken = require('../../verifyToken');
const verifyTokenWithoutBlock = require('../../verifyTokenWithoutBlock');
const router = express.Router({mergeParams: true});

router.route('/')
    .get(
        verifyTokenWithoutBlock,
        blogProtector.privateBlog,
        blogProtector.blockedBlogsFilter,
        postController.getPosts,
    )
    .post(
        verifyToken,
        blogProtector.blogAdmin,
        postController.uploadFiles,
        postController.handleUploadedMedia,
        postController.protectAttributes,
        postController.reblog,
        postController.create,
    );

router.route('/draft')
    .get(
        verifyToken,
        blogProtector.blogAdmin,
        postController.draft,
    );
router.route('/submission')
    .get(
        verifyToken,
        blogProtector.blogAdmin,
        submissionController.submittedPosts,
    )
    .post(
        verifyToken,
        postController.uploadFiles,
        postController.handleUploadedMedia,
        postController.protectAttributes,
        submissionController.submitPost,
    );

router.route('/submission/:postid')
    .delete(
        verifyToken,
        blogProtector.blogAdmin,
        submissionController.deleteSubmittedPost,
    ).post(
        verifyToken,
        postController.uploadFiles,
        postController.handleUploadedMedia,
        postController.protectAttributes,
        submissionController.acceptSubmittedPost,
    );

module.exports = router;
