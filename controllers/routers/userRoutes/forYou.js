const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {getForYouPosts} = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/for-you')
    .get(verifyToken, getForYouPosts);

module.exports = router;
