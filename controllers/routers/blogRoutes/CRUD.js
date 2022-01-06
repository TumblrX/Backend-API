const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const crud = require('../../blogFunctions/crudFuntions');

router.route('/:blogId')
    .put(verifyToken, crud.upload.any(), crud.updateLogic)
    .post(verifyToken, crud.createLogic)
    .delete(verifyToken, crud.deleteLogic)
    .get(crud.getLogic);

module.exports = router;
