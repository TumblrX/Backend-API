const io = require('socket.io')(6600, {cors: {origin: '*'}});
const jwt = require('jsonwebtoken');
const AppError = require('../controllers/utils/appError');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');
const {ChatModel} = require('../models/Chat');

if (!(process.env.SERVER==='true')) {
    dotenv.config({
        path: '../config.env',
    });
}

const dbPass = process.env.MONGODB_PASS;
const dbURL = process.env.MONGODB_URL.replace('<password>', dbPass);

mongoose.connect(dbURL, (err) => {
    if (err) {
        console.error('Couldn\'t Connect to Database 😢');
    } else {
        console.log('Connected to Database');
    }
});

const saveMessage = async (content, senderId, receiverId) => {
    if (senderId.equals(receiverId)) {
        return 'you can\'t text yourself';
    }
    const receiverUser = await User.findOne({_id: receiverId});
    if (!receiverUser) return 'no user found';
    let chat = await ChatModel.findOne({
        $or: [{$and: [{user1: senderId, user2: receiverId}]},
            {$and: [{user1: receiverId}, {user2: senderId}]},
        ],
    });
    if (chat) {
        // if there is a chat already between these two users
        await ChatModel.updateOne({
            $or: [{$and: [{user1: senderId}, {user2: receiverId}]},
                {$and: [{user1: receiverId}, {user2: senderId}]},
            ],
        }, {
            $push: {messages: {text: content, senderId: senderId}},
        });
    } else {
    // assumtion is the user1Id is the senderId
        chat = new ChatModel({
            messages: [{
                text: content,
                senderId: senderId,
            }],
            user1: senderId,
            user2: receiverId,
        });
        chat = await chat.save();
    }
    return 'saved';
};

io.use(async (socket, next) => {
    const token1 = socket.handshake.headers.authorization;
    const token2 = socket.handshake.auth.token;
    let verified;
    if (token1 !== undefined) {
        verified = await jwt.verify(token1, process.env.TOKEN_SECRET);
    } else if (token2 !== undefined) {
        verified = await jwt.verify(token2, process.env.TOKEN_SECRET);
    } else {
        return next(new AppError('Access Denied!', 401));
    }
    const user = await User.findById(verified._id);
    if (!user) return next(new AppError('this account was deleted', 404));
    socket.userID = verified._id;
    socket.user = user;
    next();
});

io.on('connection', (socket) => {
    // send all sockets of the same user to the same room
    socket.join(socket.userID);
    socket.on('private message', async ({content, receiverId}) => {
        const response = await saveMessage(content, socket.user._id, mongoose.Types.ObjectId(receiverId));
        if (response === 'saved') {
            io.to(receiverId).to(socket.userID).emit('privateMessage', {
                content: content,
                senderId: socket.userID,
                receiverId: receiverId,
            });
        };
    });

    // reterive chat event
    socket.on('reteriveChat', async ({receiverId}) => {
        const chat = await ChatModel.findOne(
            {$or: [{$and: [{user1: socket.user._id}, {user2: mongoose.Types.ObjectId(receiverId)}]},
                {$and: [{user1: mongoose.Types.ObjectId(receiverId)}, {user2: socket.user._id}]},
                {_id: mongoose.Types.ObjectId(receiverId)}]});
        let messages = [];
        if (chat) {
            if (chat.user1.equals(req.user._id)) {
                messages = chat.messages.slice(chat.startUser1);
            } else {
                messages = chat.messages.slice(chat.startUser2);
            }
        }
        // send the messages to this socket instance only
        io.to(socket.id).emit('reteriveChat', messages);
    });

    socket.on('disconnect', async () => {
        const matchingSockets = await io.in(socket.userID).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
            console.log('user disconnected');
        }
    });
});
