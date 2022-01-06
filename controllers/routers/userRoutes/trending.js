const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/trending')
    .get(exploreFunctions.getTrendingPosts);

module.exports = router;
