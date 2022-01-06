const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {catchAsync} = require('../../errorHandler');
const {ChatModel} = require('../../../models/Chat');
const mongoose = require('mongoose');

const compare = (a, b) => {
    if ( a.createdAt < b.createdAt ) {
        return 1;
    }
    if (a.createdAt > b.createdAt) {
        return -1;
    }
    return 0;
};

const reteriveChatLogic = catchAsync(async (req, res, next) => {
    const chat = await ChatModel.findOne(
        {$or: [{$and: [{user1: req.user._id}, {user2: mongoose.Types.ObjectId(req.params.id)}]},
            {$and: [{user1: mongoose.Types.ObjectId(req.params.id)}, {user2: req.user._id}, {isDeletedUser2: false}]},
            {_id: mongoose.Types.ObjectId(req.params.id)}]});
    let messages = [];
    if (chat) {
        if (chat.user1.equals(req.user._id)) {
            messages = chat.messages.slice(chat.startUser1);
        } else {
            messages = chat.messages.slice(chat.startUser2);
        }
        messages.sort(compare);
    }
    res.status(200).json({
        messages: messages,
    });
});

router.route('/reterive-chat/:id').get(verifyToken, reteriveChatLogic);

module.exports = router;
