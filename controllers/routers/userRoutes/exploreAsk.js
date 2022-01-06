const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/ask')
    .get(exploreFunctions.getTrendingAskPosts);

module.exports = router;
