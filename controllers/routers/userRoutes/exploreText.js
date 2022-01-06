const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/text')
    .get(exploreFunctions.getTrendingTextPosts);

module.exports = router;
