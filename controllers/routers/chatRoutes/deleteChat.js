const router = require('express').Router();
const {catchAsync} = require('../../errorHandler');
const {ChatModel} = require('../../../models/Chat');
const verifyToken = require('../../verifyToken');
const mongoose = require('mongoose');

const deleteLogic = catchAsync(async (req, res, next) => {
    const chat = await ChatModel.findOne(
        {$or: [{$and: [{user1: req.user._id}, {user2: mongoose.Types.ObjectId(req.params.id)}]},
            {$and: [{user1: mongoose.Types.ObjectId(req.params.id)}, {user2: req.user._id}]},
            {_id: mongoose.Types.ObjectId(req.params.id)}]});
    if (chat) {
        if (chat.user1.equals(req.user._id)) {
            await chat.updateOne({$set: {startUser1: chat.messages.length}});
        } else {
            await chat.updateOne({$set: {startUser2: chat.messages.length}});
        }
        await chat.save();
        res.status(200).json({
            message: 'chat deleted',
        });
    } else {
        res.status(400).json({
            message: 'no chat was found',
        });
    }
});

router.route('/delete-chat/:id').delete(verifyToken, deleteLogic);

module.exports = router;
