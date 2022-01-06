
/**
 * @swagger
 *  /api/blog/{blogid}/ask:
 *    get:
 *      tags: [Blog]
 *      summary: get all unanswered questions
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf:
 *                            - $ref: '#/components/PostCreator'
 *                            - type: object
 *                              properties:
 *                                  blog:
 *                                      allOf:
 *                                          - $ref: '#/components/schemas/BlogAttribution'
 *    post:
 *      tags: [Blog]
 *      summary: ask a question
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/PostCreator'
 *                        - type: object
 *                          properties:
 *                              isAnonymous:
 *                                  type: boolean
 *                                  default: false
 *      responses:
 *          201:
 *            description: asked
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
 */
/**
 * @swagger
 *  /api/blog/{blogid}/ask/{questionid}/answer:
 *    post:
 *      tags: [Blog]
 *      summary: answer a question
 *      parameters:
 *             - $ref: '#/components/parameters/Authorization'
 *             - $ref: '#/components/parameters/BlogIdParameter'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                        - $ref: '#/components/PostCreator'
 *      responses:
 *          201:
 *            description: asked
 *          400:
 *            $ref: '#/components/responses/400BadRequest'
 *          401:
 *            $ref: '#/components/responses/401Unauthorized'
 *          500:
 *            $ref: '#/components/responses/500ServerError'
*/
