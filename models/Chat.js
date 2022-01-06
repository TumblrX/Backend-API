const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    _id: false,
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
{
    timestamps: true,
});

const chatSchema = new Schema({
    messages: [messagesSchema],
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    startUser1: {
        type: Number,
        default: 0,
    },
    startUser2: {
        type: Number,
        default: 0,
    },
    // blog1 and blog2 are the IDs of the blogs who own this chat
});

const ChatModel = mongoose.model('Chat', chatSchema);
module.exports = {chatSchema, ChatModel};
