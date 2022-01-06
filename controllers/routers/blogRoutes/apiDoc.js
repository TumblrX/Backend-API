/* eslint-disable max-len */
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog's related APIs
 */

/**
* @swagger
* components:
*    schemas:
*        globalParameters:
*          type: object
*          properties:
*              avatarShape:
*                 type: boolean
*                 description: circle or square (deafult false means square)
*              backgroundColor:
*                 type: string
*                 description: color for your background(deafult black)
*              titleFont:
*                 type: string
*                 enum: ['avalon', 'arquitecta', 'baskerville', 'bodoni', 'bookmania','brutal type', 'calluna sans', 'capital', 'caslon fs', 'georgia', 'gibson', 'grumpy']
*                 description: font of the title of the blog (deafult 'gibson')
*              headerImage:
*                 type: string
*                 description: cover photo
*              stretchHeaderImage:
*                 type: boolean
*                 description: size of cover photo (deafult false)
*              accentColor:
*                 type: string
*                 description: accent color
*              showAvatar:
*                 type: boolean
*                 description: people can see it or no (deafult true)
*              showDescription:
*                 type: boolean
*                 description: people can see it or no (deafult true)
*              showHeaderImage:
*                 type: boolean
*                 description: people can see it or no (deafult true)
*              showTitle:
*                 type: boolean
*                 description: people can see it or no (deafult true)
*              titleColor:
*                 type: string
*                 description: color of blog title (deafult black)
*              titleFontWeightIsBold:
*                 type: boolean
*                 description: font of the title of the blog bold or NO (deafult true)
*        customParameters:
*          type: object
*          properties:
*              slidingHeader:
*                 type: boolean
*                 description: enable or disable sliding header (deafult true)
*              showNavigation:
*                 type: boolean
*                 description: show or hide navigation (deafult true)
*              endlessScrolling:
*                 type: boolean
*                 description: Surf your dashboard page by page instead of as an infinitely scrolling feed (deafult true)
*              syntaxHighlighting:
*                 type: boolean
*                 description: enable or disable Syntax highlighting (deafult false)
*              layout:
*                 type: string
*                 enum: ['Regular', 'Wide', 'Minimal', 'Grid']
*                 description: select layout
*              relatedPosts:
*                 type: boolean
*                 description: enable or disable Related Posts (deafult true)
*        settings:
*          type: object
*          required:
*            - content
*          description: settings of the blog
*          properties:
*            allowSubmission:
*              type: boolean
*              description: enable or disenable submission (deafult true)
*            blogPassword:
*              type: string
*              description: to protect secondary blogs
*            hideFromSearch:
*              type: boolean
*              description: hide or unhide blog from searches (deafult false)
*            ask:
*              type: boolean
*              description: allow people to ask you (deafult true)
*            blogAvatar:
*              type: boolean
*              description: On the Dashboard, followers will see authors' portraits in addition to this blog's portrait next to each post (deafult false)
*        customAppearance:
*          type: object
*          required:
*            - content
*          description: custom appearance of the blog
*          properties:
*            truncateFeed:
*              type: boolean
*              description: truncateFeed (deafult false)
*            openLinksInNewWindow:
*              type: boolean
*              description: open links in another window (deafult false)
*            postsPerPage:
*              type: number
*              description: the posts that one page contain (deafult '10')
*            customTheme:
*              type: string
*              description: choose custom theme (deafult 'Tumblr offical')
*            enableMobileInterFace:
*              type: boolean
*              description: enable or disable mobile interface (deafult false)
*            avatarUrl:
*              type: string
*              description: url of the avatar
*            globalParameters:
*              type: object
*              allOf:
*                - $ref: '#/components/schemas/globalParameters'
*            customParameters:
*              type: object
*              allOf:
*                - $ref: '#/components/schemas/customParameters'
*        BlogAttribution:
*          type: object
*          properties:
*            title:
*              type: string
*              description: A title choosen by the user that descripes his/her blog
*            handle:
*              type: string
*              description: Unique identifier of the blog choosen by the user
*            isAvatarCircle:
*              type: boolean
*              description: The avatar shape could be a circle or a square, false->circle, true->square
*            avatar:
*              type: string
*              description: URL of the blog's avatar
*            id:
*              type: string
*              description: Unique identifer of the blog generated in the database
*/

/**
 * @swagger
 * /api/blog/{blogid}/blocksbulk:
 *   post:
 *     tags: [Blog]
 *     summary: Block a list of Blogs
 *     description: Block a list of Blogs with limited number.
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - $ref: '#/components/parameters/BlogIdParameter'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blockedTumblelog:
 *                   type: string
 *                   description: Comma-separated list of tumblelogs to block.
 *                   required: true
 *     responses:
 *       200:
 *         description: blocked the list successfully
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/{blogid}/editcustom:
 *   put:
 *     tags: [Blog]
 *     summary: edit blog informations
 *     description: This api is used to edit your custom appearance
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - $ref: '#/components/parameters/BlogIdParameter'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/customAppearance'
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


/**
 * @swagger
 * /api/blog/{blogid}/followers:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve a Blog's Followers
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
 *                 totalUsers:
 *                   type: number
 *                   description: The number of users currently following the blog.
 *                 users:
 *                   type: array
 *                   description: followers
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user's name on tumblr.
 *                       following:
 *                         type: boolean
 *                         description: Whether the caller is following the user.
 *                       url:
 *                         type: string
 *               example:
 *                 {
 *                   "totalUsers": 2684,
 *                   "users": [
 *                              {
 *                                "name": "mahdy",
 *                                "following": true,
 *                              }
 *                            ]
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

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

/**
 * @swagger
 * /api/blog/{blogid}/blocks:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve Blog's Blocks
 *     description: Get the blogs that the requested blog is currently blocking.
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
 *                  blockedTumblelogs:
 *                   type: array
 *                   description: Blog objects that are blocked.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: the short name of the blog
 *                       title:
 *                         type: string
 *                         description: the title of the blog
 *                       description:
 *                         type: string
 *                         description: Reason of blocking
 *               example:
 *                 {
 *                   "blockedTumblelogs": [
 *                              {
 *                                "name": "joe",
 *                                "title": "Spammy Joe",
 *                                "description": "Posting things you don't really care for",
 *                              }
 *                            ]
 *
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

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

/**
 * @swagger
 * /api/blog/{blogid}/notifications:
 *   get:
 *     tags: [Blog]
 *     summary:  Retrieve Blog's Activity Feed
 *     description: Retrieve the activity items for a specific blog, in reverse chronological order.
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *       - in: query
 *         name: before
 *         schema:
 *           type: number
 *         description: Unix epoch timestamp that begins the page, defaults to request time.
 *         required: false
 *       - in: query
 *         name: types
 *         schema:
 *           type: array
 *         description: An array of one or more types to filter by
 *         required: false
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   description: An array of objects each represents a notification
 *                   items:
 *                     type: object
 *                     properties:
 *                       blogHandel:
 *                         type: string
 *                       url:
 *                         type: string
 *                       timeStamp:
 *                         type: intger
 *                       description:
 *                         type: string
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/message:
 *   get:
 *     tags: [Blog]
 *     summary: recieve messages from another blog
 *     description: This api is used to contact with diffrent blogs
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogHandel:
 *                   type: string
 *                   description: The unique identifier of the blog to contact with
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: object
 *                   description: array of messages information
 *                   items:
 *                     type: object
 *                     properties:
 *                       timeStamp:
 *                         type: timestamp
 *                         description: When that event occure
 *                       text:
 *                         type: string
 *                         description: the text you recieved
 *                       image:
 *                         type: string
 *                         description: the image you recieved
 *                 index:
 *                   type: string
 *                   description: string representing from and to blog handels
 *               example:
 *                 {
 *                   "index": "yousef + peter",
 *                   "messages": [
 *                              {
 *                                "timeStamp": "Now",
 *                                "text": "hello back",
 *                              }
 *                            ]
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/blog/{blogid}:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve a Blog's information
 *     description: This method can be used to retrieve blog information and posts that blog contains
 *     parameters:
 *       - $ref: '#/components/parameters/BlogIdParameter'
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogHandle:
 *                   type: string
 *                   description: Unique string to specify the blog
 *                 blogTitle:
 *                   type: string
 *                   description: title for your blog
 *                 avatar:
 *                   type: string
 *                   description: URL for the avatar
 *                 description:
 *                   type: string
 *                   description: inforamtion about your blog
 *                 containPosts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                   description: posts that blog contain
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/blog/{blogid}/followers:
 *   get:
 *     tags: [Blog]
 *     summary: send specific blog
 *     description: This api is used to search in your followers
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     - in: query
 *       name: blogHandle
 *       schema:
 *         type: string
 *       description: The handle of the blog you want to search.
 *       required: true
 *     responses:
 *       200:
 *         description: the request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: true if we find him, false otherwise
 *                 blogHandle:
 *                   type: string
 *                   description: Unique string to specify the blog
 *                 blogTitle:
 *                   type: string
 *                   description: title for your blog
 *                 avatar:
 *                   type: string
 *                   description: URL for the avatar
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

/**
 * @swagger
 * /api/blog/message:
 *   post:
 *     tags: [Blog]
 *     summary: send messages to another blog
 *     description: This api is used to contact with diffrent blogs
 *     parameters:
 *     - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogHandel:
 *                   type: string
 *                   description: The unique identifier of the blog to contact with
 *     responses:
 *       200:
 *         description: The request has succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: object
 *                   description: array of messages information
 *                   items:
 *                     type: object
 *                     properties:
 *                       timeStamp:
 *                         type: timestamp
 *                         description: When that event occure
 *                       text:
 *                         type: string
 *                         description: the text you send
 *                       image:
 *                         type: string
 *                         description: the image you send
 *                 index:
 *                   type: string
 *                   description: string representing from and to blog handels
 *               example:
 *                 {
 *                   "index": "yousef + peter",
 *                   "messages": [
 *                              {
 *                                "timeStamp": "",
 *                                "text": "hello",
 *                              }
 *                            ]
 *                 }
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500ServerError'
 */

