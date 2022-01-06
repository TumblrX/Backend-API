/* eslint-disable max-len */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User's related APIs
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     Auth:
 *       Authorization:
 *       name: Authorization
 *       in: header
 *       description: an authorization header
 *       required: true
 *       type: string
 *     SearchWord:
 *       in: query
 *       name: searchWord
 *       deacription: The search word to find results upon
 *       required: true
 *       type: string
 *     Limit:
 *       in: query
 *       name: limit
 *       schema:
 *         type: number
 *       description: The number of results to return 1–20, inclusive
 *       default: 20
 *       required: false
 *     SinceID:
 *       in: query
 *       name: sinceId
 *       schema:
 *         type: number
 *       description: Return posts that have appeared after this ID Use this parameter to page through the results first get a set of posts, and then get posts since the last ID of the previous set
 *       required: false
 *       default: 0
 *     Offset:
 *       in: query
 *       name: offset
 *       schema:
 *         type: number
 *       description: Post number to start at
 *       required: false
 *       default: 0
 *     BlogType:
 *        in: query
 *        name: blogType
 *        schema:
 *          type: string
 *        description: The type of post to return. Specify one of the following text, photo, quote, link, chat, audio, video, answer
 *        required: false
 *        default: none-return all types
 *     ReblogInfo:
 *       in: query
 *       name: reblogInfo
 *       schema:
 *         type: boolean
 *       description: Indicates whether to return reblog information (specify true or false). Returns the various reblogged_ fields.
 *       required: false
 *       default: false
 *     NotesInfo:
 *       in: query
 *       name: notesInfo
 *       schema:
 *         type: boolean
 *       description: Indicates whether to return notes information (specify true or false). Returns the various reblogged_ fields.
 *       required: false
 *       default: false
 *     Before:
 *       in: query
 *       name: before
 *       schema:
 *         type: integer
 *       description: Retrieve posts liked before the specified timestamp
 *       default: 0
 *       required: false
 *     After:
 *       in: query
 *       name: after
 *       schema:
 *         type: integer
 *       description: Retrieve posts liked after the specified timestamp
 *       default: 0
 *       required: false
 *   responses:
 *     200OK:
 *       description: The request has succeeded
 *     201Created:
 *       description: The new resource is effectively created
 *     400BadRequest:
 *       description: Bad Request
 *     401Unauthorized:
 *       description: Unauthorized access
 *     403Forbidden:
 *       description: Forbidden request
 *     404NotFound:
 *       description: The server can't find the requested resource
 *     500ServerError:
 *       description: Internal servar error
 *     200OKPost:
 *       description: The request has succeeded
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               posts:
 *                 type: array
 *                 items:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Post'
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       required:
 *         - Username
 *         - Password
 *         - Email
 *       properties:
 *         username:
 *           type: String
 *           description: The name chosen by the user for his primary blog
 *         email:
 *           type: String
 *           description: The user's email address
 *         password:
 *           type: String
 *           description: The user's hashed password if he didn't use OAuth
 *         primaryBlog:
 *           type: mongoose.Schema.Types.ObjectId
 *           $ref: '#/components/schemas/Blog'
 *           description: The user's primary blog ID
 *         blogs:
 *           type: array
 *           description: Array of the IDs of the blog this user created
 *           items:
 *             type: mongoose.Schema.Types.ObjectId
 *             $ref: '#/components/schemas/Blog'
 *         followingBlogs:
 *           type: array
 *           description: Array of the IDS of the blogs followed by this user
 *           items:
 *             type: mongoose.Schema.Types.ObjectId
 *             $ref: '#/components/schemas/Blog'
 *         followingTags:
 *           type: array
 *           description: Array of the tags of the blogs followed by this user
 *           items:
 *             type: String
 *         likedPosts:
 *           type: array
 *           description: Array of the IDs of the posts liked by this user
 *           items:
 *             type: mongoose.Schema.Types.ObjectId
 *             $ref: '#/components/schemas/Post'
 *         blockedBlogs:
 *           type: array
 *           description: Array of the IDs of the blogs blocked by this user
 *           items:
 *             type: mongoose.Schema.Types.ObjectId
 *             $ref: '#/components/schemas/Blog'
 *         settings:
 *           type: object
 *           properties:
 *             actionNotify:
 *               type: Boolean
 *               description: This boolean indicates if the user wants to get email notifications
 *             findMeByEmail:
 *               type: Boolean
 *               description: This boolean indicates if the user wants to be found by email
 *             dashBoardInfiniteScrolling:
 *               type: Boolean
 *               description: This boolean indicates if the user wants to have pages or infinite dashboard
 *             hide_likes:
 *               type: Boolean
 *               description: This boolean indicates if the user wants his likes to be visible
 *             hideFollowing:
 *               type: Boolean
 *               description: This boolean indicates if the user wants his followings to be visible
 *         notifications:
 *           type: object
 *           properties:
 *             postID:
 *               type: mongoose.Schema.Types.ObjectId
 *               description: This ID of the post to which this notification is related
 *             blogID:
 *               type: mongoose.Schema.Types.ObjectId
 *               description: This ID of the blog to which this notification is related
 *             timestamp:
 *               type: Date
 *               description: The time of the action
 *             description:
 *               type: String
 *               description: The description of the action
 *         CreatedAt:
 *           type: date
 *           description: The date when this user was created
 *         UpdatedAt:
 *           type: date
 *           description: The date when this user's date was updated
 */

