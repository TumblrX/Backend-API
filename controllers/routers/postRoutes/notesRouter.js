
/**
 * @swagger
 *  components:
 *      NoteBase:
 *          type: object
 *          required:
 *              - type
 *          properties:
 *              id:
 *                  type: string
 *              createdAt:
 *                  type: integer
 *              blogName:
 *                  type: string
 *              blogId:
 *                  type: string
 *              avatarShape:
 *                  type: string
 *                  enum:
 *                      - square
 *                      - circle
 *      reblogNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: reblog
 *                  postId:
 *                      type: string
 *                      description: id of the reblogged post
 *      commentNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: comment
 *                  commentText:
 *                      type: string
 *                      description: content of the comment
 *                  id:
 *                      type: string
 *                      description: id of the comment
 *      likeNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: like
 *      Note:
 *          oneOf:
 *              - $ref: '#/components/reblogNote'
 *              - $ref: '#/components/commentNote'
 *              - $ref: '#/components/likeNote'
 */

/**
 * @swagger
 *  /api/post/{postid}/notes:
 *      get:
 *          tags: [Post]
 *          summary: Get notes for a specific Post
 *          parameters:
 *               - $ref: '#/components/parameters/Authorization'
 *               - $ref: '#/components/parameters/PostIdPathParameter'
 *               - $ref: '#/components/parameters/beforeTimestamp'
 *               - name: mode
 *                 type: string
 *                 in: query
 *                 description:  types of notes to return if not given returns all notes can be
 *                               comment , like or reblog
 *               - name: offset
 *                 type: integer
 *                 in: query
 *                 default: 0
 *               - name: limit
 *                 type: integer
 *                 in: query
 *                 default: 20
 *          responses:
 *              200:
 *                  description: The request has succeeded
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          allOf:
 *                                              - $ref: '#/components/Note'
 *              400:
 *                 $ref: '#/components/responses/400BadRequest'
 *              401:
 *                 $ref: '#/components/responses/401Unauthorized'
 *              500:
 *                $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/post/{postid}/comment:
 *  post:
 *      tags: [Post]
 *      summary: Comment on a Post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *      requestBody:
 *           required: true
 *           content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - commentText
 *                          properties:
 *                              commentText:
 *                                  type: string
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
 * /api/post/{postid}/comments/{commentid}:
 *  delete:
 *      tags: [Post]
 *      summary: Delete a Comment on a Post
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/PostIdPathParameter'
 *             - name: commentid
 *               in: path
 *               required: true
 *               type: string
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
const express = require('express');
const router = express.Router();
const notesController = require('../../postFunctions/notesController');
const verifyToken = require('../../verifyToken');
const verifyTokenWithoutBlock = require('../../verifyTokenWithoutBlock');

router.route('/:postid/comment')
    .post(
        verifyToken,
        notesController.comment,
    );
router.route('/:postid/comments/:commentid')
    .delete(
        verifyToken,
        notesController.deleteComment,
    );

router.route('/:postid/like')
    .post(
        verifyToken,
        notesController.like,
    )
    .delete(
        verifyToken,
        notesController.unlike,
    );
router.route('/:postid/notes')
    .get(
        verifyTokenWithoutBlock,
        notesController.getNotes,
    );
module.exports = router;
