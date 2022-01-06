const router = require('express').Router();
const exploreFunctions = require('../../userFuncitons/exploreFunctions');

router.route('/:startIndex/image')
    .get(exploreFunctions.getTrendingPhotoPosts);

module.exports = router;
