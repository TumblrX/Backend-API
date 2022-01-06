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
*/

const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {upload} = require('../../blogFunctions/crudFuntions');

// router.post('/create', verifyToken, require('./create'));
// router.get('/info', verifyToken, require('./info'));
// router.get('/avatar', require('./avatar'));
router.get('/search', require('./searchBlogs'));
router.post('/:blogid/blocks', verifyToken, require('./block').block);
router.post('/:blogid/blockhandle', verifyToken, require('./blockHandle').blockHandle);
router.delete('/:blogid/unblock', verifyToken, require('./unblock').unBlock);
router.get('/:blogid/followers', verifyToken, require('./followers').followersLogic);
// router.get('/following', verifyToken, require('./following'));
router.get('/:blogid/blocks', verifyToken, require('./getBlocks').getBlocksLogic);
// router.get('/followedby', verifyToken, require('./FollowedBy'));
// router.get('/:blogid/retrieveBlog/:retrievingid', verifyToken, require('./retrieveBlog').retrieveBlog);
router.get('/:blogid/searchfollowers', verifyToken, require('./searchFollowers').searchFollowersLogic);
router.get('/:blogid/getsettings', verifyToken, require('./getSettings').getSettings);
router.post('/:blogid/editusername', verifyToken, require('./edit/editUsername').editUsername);
router.post('/:blogid/editask', verifyToken, require('./edit/editAsk').editAsk);
router.post('/:blogid/editsubmission', verifyToken, require('./edit/editSubmissions').editSubmissions);
router.post('/:blogid/editmessaging', verifyToken, require('./edit/editmessaging').editMessaging);
router.post('/:blogid/editreply', verifyToken, require('./edit/editReply').editReply);
router.post('/:blogid/edithidefromsearch', verifyToken, require('./edit/editHideFromSearch').editHideFromSearch);
router.post('/:blogid/editsharelikes', verifyToken, require('./edit/editShareLikes').editShareLikes);
router.post('/:blogid/editsharefollowing', verifyToken, require('./edit/editShareFollowing').editShareFollowing);
router.post('/:blogid/editblogavatar', verifyToken, require('./edit/editBlogAvatar').editBlogAvatar);
router.post('/:blogid/editactivatepassward', verifyToken, require('./edit/editActivatePassward').editActivatePassward);
router.post('/:blogid/editblogpassward', verifyToken, require('./edit/editBlogPassward').editBlogPassward);
router.put('/edit-theme/:id', verifyToken, upload.any(), require('./edit'));
module.exports = router;
