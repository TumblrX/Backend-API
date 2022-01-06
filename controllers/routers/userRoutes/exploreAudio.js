const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/audio')
    .get(exploreFunctions.getTrendingAudioPosts);

module.exports = router;
