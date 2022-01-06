const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {catchAsync} = require('../../errorHandler');
const {ChatModel} = require('../../../models/Chat');
const mongoose = require('mongoose');
const AppError = require('../../utils/appError');
const User = require('../../../models/User');

const sendMessageLogic = catchAsync(async (req, res, next) => {
    if (req.user._id.equals(mongoose.Types.ObjectId(req.body.user2Id))) {
        return next(new AppError('you can\'t text yourself', 400));
    }
    const receiverUser = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user2Id)});
    if (!receiverUser) return next(new AppError('no such user was found', 400));
    let chat = await ChatModel.findOne({
        $or: [{$and: [{user1: req.user._id, user2: mongoose.Types.ObjectId(req.body.user2Id)}]},
            {$and: [{user1: mongoose.Types.ObjectId(req.body.user2Id)}, {user2: req.user._id}]},
        ],
    });
    if (chat) {
        // if there is a chat already between these two users
        await ChatModel.updateOne({
            $or: [{$and: [{user1: req.user._id}, {user2: mongoose.Types.ObjectId(req.body.user2Id)}]},
                {$and: [{user1: mongoose.Types.ObjectId(req.body.user2Id)}, {user2: req.user._id}]},
            ],
        }, {
            $push: {messages: {text: req.body.textMessage, senderId: req.user._id}},
        });
    } else {
    // assumtion is the user1Id is the senderId
        chat = new ChatModel({
            messages: [{
                text: req.body.textMessage,
                senderId: req.user._id,
            }],
            user1: req.user._id,
            user2: mongoose.Types.ObjectId(req.body.user2Id),
        });
        chat = await chat.save();
    }
    res.status(200).json({
        chatId: chat._id,
    });
});

router.route('/send-message').post(verifyToken, sendMessageLogic);

module.exports = router;
