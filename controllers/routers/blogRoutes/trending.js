const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const exploreFunctions = require('../../blogFunctions/exploreFunctions');

router.route('/:startIndex/trending')
    .get(verifyToken, exploreFunctions.getTrendingBlogs);

module.exports = router;
