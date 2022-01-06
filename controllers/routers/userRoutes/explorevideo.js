const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/video')
    .get(exploreFunctions.getTrendingVideoPosts);

module.exports = router;
