const express = require('express');
const router = express.Router();
const notificationController = require('../../notificationFunctions/notification');
const verifyToken = require('../../verifyToken');

router.post('/auth',
    verifyToken,
    notificationController.auth,
);

router.get('/blog/:blogId',
    verifyToken,
    notificationController.blogNotifications,
);

router.route('/user')
    .get(
        verifyToken,
        notificationController.userNotifications,
    ).post(
        verifyToken,
        notificationController.markAs,
    );

module.exports = router;
