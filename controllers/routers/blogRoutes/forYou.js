const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const exploreFunctions = require('../../blogFunctions/exploreFunctions');

router.route('/:startIndex/for-you')
    .get(verifyToken, exploreFunctions.getForYouBlogs);

module.exports = router;
