// required pakages
const verifyToken = require('../../verifyToken');
// eslint-disable-next-line new-cap
const router = require('express').Router();

router.post('/register', require('./Authentication').register);
router.post('/login', require('./Authentication').login);
router.post('/redirect', require('./redirect'));
router.post('/follow', verifyToken, require('./follow').followLogic);
router.delete('/unfollow', verifyToken, require('./unfollow'));
router.get('/info', verifyToken, require('./info'));
router.get('/dashboard', verifyToken, require('./dashboard'));
router.post('/settings-save', verifyToken, require('./setting-save'));
router.post('/forgot-password', require('./forgot-password'));
router.post('/email-check', require('./emailCheck'));
router.post('/username-check', require('./usernameCheck'));
router.get('/get-blogs', verifyToken, require('./get-blogs'));
router.get('/likes', verifyToken, require('./likes'));
router.post('/verify-email', require('./verifyEmail'));
router.post('/change-password', require('./changePassword'));
router.post('/change-email', verifyToken, require('./changeEmail'));
router.get('/navbar', verifyToken, require('./navbar'));
router.get('/following', verifyToken, require('./following'));
router.post('/follow-tag', verifyToken, require('./followTag'));
router.post('/unfollow-tag', verifyToken, require('./unfollowTag'));
router.get('/get-tags', require('./getTags'));
module.exports = router;
