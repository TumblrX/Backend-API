const router = require('express').Router();
const verifyToken = require('../../verifyToken');
const {catchAsync} = require('../../errorHandler');
const {ChatModel} = require('../../../models/Chat');

const compare = (a, b) => {
    if ( a.messageDate < b.messageDate) {
        return 1;
    }
    if (a.messageDate > b.messageDate) {
        return -1;
    }
    return 0;
};

const editResponseApperance = (chats, userId) => {
    const edittedChats = [];
    for (let i = 0; i < chats.length; i++) {
        const data = {};
        data.chatId = chats[i]._id;
        if (chats[i].user1) {
            // check if the user has deleted the chat, so remove the that chat from conversations
            if (chats[i].messagesSize <= chats[i].startUser2) {
                continue;
            } else {
                data.textedUser = chats[i].user1._id;
                data.primaryBlogId = chats[i].user1.primaryBlog._id;
                data.blogHandle = chats[i].user1.primaryBlog.handle;
                data.avatar = chats[i].user1.primaryBlog.avatar;
            }
        } else {
            if (chats[i].messagesSize <= chats[i].startUser1) {
                console.log('user1');
                continue;
            } else {
                data.textedUser = chats[i].user2._id;
                data.primaryBlogId = chats[i].user2.primaryBlog._id;
                data.blogHandle = chats[i].user2.primaryBlog.handle;
                data.avatar = chats[i].user2.primaryBlog.avatar;
            }
        }
        data.message = chats[i].messages[0].text;
        data.messageDate = chats[i].messages[0].createdAt;
        data.messageSenderId = chats[i].messages[0].senderId;
        if (chats[i].messages[0].senderId.equals(userId)) {
            data.isMe = true;
        } else {
            data.isMe = false;
        }
        edittedChats.push(data);
    }
    edittedChats.sort(compare);
    return edittedChats;
};

const reteriveConverstionsLogic = catchAsync(async (req, res, next) => {
    const chats1 = await ChatModel
        .find({user1: req.user._id})
        .populate({
            path: 'user2',
            populate: {
                path: 'primaryBlog',
                select: {
                    _id: true,
                    avatar: true,
                    handle: true,
                },
            },
            select: {
                _id: true,
            },
        })
        .select({
            _id: true,
            messages: {$slice: ['$messages', -1]},
            messagesSize: {$size: '$messages'},
            startUser1: true,
        })
        .lean();
    const chats2 = await ChatModel
        .find({user2: req.user._id})
        .populate({
            path: 'user1',
            populate: {
                path: 'primaryBlog',
                select: {
                    _id: true,
                    avatar: true,
                    handle: true,
                },
            },
            select: {
                _id: true,
            },
        })
        .select({
            _id: true,
            messages: {$slice: ['$messages', -1]},
            messagesSize: {$size: '$messages'},
            startUser2: true,
        })
        .lean();
    let chats = [];
    if (chats1 && chats2) {
        chats = editResponseApperance(chats1.concat(chats2), req.user._id);
    } else if (chats1) {
        chats = editResponseApperance(chats1, req.user._id);
    } else if (chats2) {
        chats = editResponseApperance(chats2, req.user._id);
    }
    res.status(200).json({
        data: chats,
    });
});

router.route('/reterive-conversations').get(verifyToken, reteriveConverstionsLogic);

module.exports = router;
