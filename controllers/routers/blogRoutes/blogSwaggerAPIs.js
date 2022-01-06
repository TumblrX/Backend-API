/* eslint-disable max-len */
/**
 * @swagger
 * /api/blog/{blogid}/editusername:
 *   post:
 *     tags: [Blog]
 *     summary: editusername
 *     requestBody:
 *       content: {}
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: username
 *         in: query
 *         schema:
 *           type: string
 *         example: hussienn
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editask:
 *   post:
 *     tags: [Blog]
 *     summary: editask
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               allowAsk: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editsharelikes:
 *   post:
 *     tags: [Blog]
 *     summary: editsharelikes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               shareLikes: 'false'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editblogavatar:
 *   post:
 *     tags: [Blog]
 *     summary: editblogavatar
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               blogAvatar: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editblogpassward:
 *   post:
 *     tags: [Blog]
 *     summary: editblogpassward
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               password: '1234567449'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NjE2N30.wKX1NVMC5vXTIJO0159MrCw6RyM8joJJPDpu-sk7Z7Y
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editsubmission:
 *   post:
 *     tags: [Blog]
 *     summary: editsubmission
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               allowSubmission: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editsharefollowing:
 *   post:
 *     tags: [Blog]
 *     summary: editsharefollowing
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               shareFollowing: 'false'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editmessaging:
 *   post:
 *     tags: [Blog]
 *     summary: editmessaging
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               messaging: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editreply:
 *   post:
 *     tags: [Blog]
 *     summary: editreply
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               replies: 'false'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/edithidefromsearch:
 *   post:
 *     tags: [Blog]
 *     summary: edithidefromsearch
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               hideFromSearch: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NTMyNX0.OIKTtDzxVMdxn-I0vfuKVag9nFwqIghQi-Rv82ATR8E
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/editactivatepassward:
 *   post:
 *     tags: [Blog]
 *     summary: editactivatepassward
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               activatePassward: 'true'
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NjE2N30.wKX1NVMC5vXTIJO0159MrCw6RyM8joJJPDpu-sk7Z7Y
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/getsettings:
 *   get:
 *     tags: [Blog]
 *     summary: getsettings
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1MzMwZDM1MjUzMDVlOWQxMjk2ZTciLCJwcmltYXJ5QmxvZyI6IjYxYjUzMzBkMzUyNTMwNWU5ZDEyOTZlYSIsImlhdCI6MTYzOTI2NjE2N30.wKX1NVMC5vXTIJO0159MrCw6RyM8joJJPDpu-sk7Z7Y
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/blocks:
 *   post:
 *     tags: [Blog]
 *     summary: blocks
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               _id: 61cbb4c9fcd13aba30cf2333
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiYjUwNmZjZDEzYWJhMzBjZjIzNDIiLCJwcmltYXJ5QmxvZyI6IjYxY2JiNTA2ZmNkMTNhYmEzMGNmMjM0NSIsImlhdCI6MTY0MDgxNjYxOX0.vRT4EmlGc1l6i7HCZqT4OtMYHnVXYltiBJKYkF_EnSU
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 *   get:
 *     tags: [Blog]
 *     summary: getBlockedBlogs
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiYjUwNmZjZDEzYWJhMzBjZjIzNDIiLCJwcmltYXJ5QmxvZyI6IjYxY2JiNTA2ZmNkMTNhYmEzMGNmMjM0NSIsImlhdCI6MTY0MDgxNjYxOX0.vRT4EmlGc1l6i7HCZqT4OtMYHnVXYltiBJKYkF_EnSU
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/unblock:
 *   delete:
 *     tags: [Blog]
 *     summary: unblock
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiYjRjOWZjZDEzYWJhMzBjZjIzMzAiLCJwcmltYXJ5QmxvZyI6IjYxY2JiNGM5ZmNkMTNhYmEzMGNmMjMzMyIsImlhdCI6MTY0MDgxNDgwOH0.w40QKGPBo7iOwYG8hYkStFFZwTPxzAA0G9JooIzhzys
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/followers:
 *   get:
 *     tags: [Blog]
 *     summary: followers
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1MTQxMTQ2NTU5NDQzNmUzZDllODQiLCJwcmltYXJ5QmxvZyI6IjYxOTUxNDExNDY1NTk0NDM2ZTNkOWU4NSIsImlhdCI6MTY0MDA0MzYxMX0.u6XxwspboAhY1rILUtJCSsrMOLLZG6shEsxSsFKG8hA
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/searchfollowers:
 *   get:
 *     tags: [Blog]
 *     summary: searchfollowers
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: number
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1MTQxMTQ2NTU5NDQzNmUzZDllODQiLCJwcmltYXJ5QmxvZyI6IjYxOTUxNDExNDY1NTk0NDM2ZTNkOWU4NSIsImlhdCI6MTY0MDAxODkzMn0.6qN6zhUiVRXkqzPwJXNGBzTpzTfthtY53qSkyOSkr7U
 *       - name: follower
 *         in: query
 *         schema:
 *           type: string
 *         example: 61b3ddb07636bd8374ee7d3b
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 * /api/blog/{blogid}/blockhandle:
 *   post:
 *     tags: [Blog]
 *     summary: blockHandle
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               handle: andrew2
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         example: >-
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiYjRjOWZjZDEzYWJhMzBjZjIzMzAiLCJwcmltYXJ5QmxvZyI6IjYxY2JiNGM5ZmNkMTNhYmEzMGNmMjMzMyIsImlhdCI6MTY0MDgwNzg0Mn0.kavtn2-y7m7e33MMbPTCGY37J3O8ucqF2y-6-aJoqEQ
 *       - name: blogid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         example: 61cbb4c9fcd13aba30cf2333
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */

/**
 * @swagger
 * /api/blog/{blogId}:
 *   delete:
 *     tags: [Blog CRUD]
 *     summary: delete a blog
 *     description: This api is used to delete a blog
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - $ref: '#/components/parameters/BlogIdParameter'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 email: something@something.com
 *                 password: password123
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200OK'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
* @swagger
* paths:
*  /api/blog/{blogId}:
*    post:
*      tags: [Blog CRUD]
*      summary: createBlog
*      requestBody:
*        content:
*          application/json:
*            schema:
*              type: object
*              example:
*                title: my blog
*                handle: newbishoy5
*                private: true
*                password: '123456'
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: string
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjYzIzYzcwZjkzMjgyZjNhYWM5MWQiLCJwcmltYXJ5QmxvZyI6IjYxY2NjMjNjNzBmOTMyODJmM2FhYzkyMCIsImlhdCI6MTY0MTA0ODYwNn0.CCKdc0pyLiI3r_bqCctlddgOHe_2LaFdxWf3a3UJjw4
*      responses:
*        200:
*         $ref: '#/components/responses/200OK'
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*          content:
*            application/json: {}
*    put:
*      tags: [Blog CRUD]
*      summary: updateBlog
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                headerImage:
*                  type: string
*                  format: binary
*                avatar:
*                  type: string
*                  format: binary
*                title:
*                  type: string
*                  example: my new title
*                password:
*                  type: string
*                  example: bishoy123
*                isPrivate:
*                  type: boolean
*                  example: 'true'
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: string
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjYzIzYzcwZjkzMjgyZjNhYWM5MWQiLCJwcmltYXJ5QmxvZyI6IjYxY2NjMjNjNzBmOTMyODJmM2FhYzkyMCIsImlhdCI6MTY0MTA0ODYwNn0.CCKdc0pyLiI3r_bqCctlddgOHe_2LaFdxWf3a3UJjw4
*        - name: blogId
*          in: path
*          schema:
*            type: string
*          required: true
*      responses:
*        200:
*         $ref: '#/components/responses/200OK'
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*    get:
*      tags: [Blog CRUD]
*      summary: retrieveBlog
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: string
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjYzIzYzcwZjkzMjgyZjNhYWM5MWQiLCJwcmltYXJ5QmxvZyI6IjYxY2NjMjNjNzBmOTMyODJmM2FhYzkyMCIsImlhdCI6MTY0MTA0ODYwNn0.CCKdc0pyLiI3r_bqCctlddgOHe_2LaFdxWf3a3UJjw4
*        - name: blogId
*          in: path
*          schema:
*            type: string
*          required: true
*          example: 61d08cd8ee60110b5bc067b8
*      responses:
*        200:
*         $ref: '#/components/responses/200OK'
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*  /api/blog/search:
*    get:
*      tags: [Blog CRUD]
*      summary: search
*      parameters:
*        - name: q
*          in: query
*          schema:
*            type: string
*          example: .*
*        - name: startindex
*          in: query
*          schema:
*            type: integer
*          example: '1'
*        - name: blogslimit
*          in: query
*          schema:
*            type: integer
*          example: '1'
*      responses:
*        200:
*         $ref: '#/components/responses/200OK'
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*/
