const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const blogAttribution = require('../models/Post').blogAttribution;
const notifier = require('../controllers/utils/notifications');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
        select: blogAttribution,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fromBlog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        autopopulate: {
            select: blogAttribution,
        },
    },
    wasRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    discriminatorKey: 'type',
});

notificationSchema.post('save', async function(doc) {
    if (!doc.populated('fromBlog')) {
        await doc.populate('fromBlog', blogAttribution);
    }
    if (doc.populated('blog')) {
        const blogAttr=doc.blog.toObject({
            transform: (_, ret)=>{
                const keepKeys = Object.keys(blogAttribution);
                for (const key of Object.keys(ret)) {
                    if (!keepKeys.includes(key)) {
                        delete ret[key];
                    }
                }
                return ret;
            },
        });
        doc=doc.toJSON();
        delete doc.blog;
        doc.blog=blogAttr;
    }
    notifier.notifyUser(doc.userId, 'notification', doc);
});

notificationSchema.plugin(autopopulate);


const Notification = mongoose.model('Notification', notificationSchema);

const followSchema = new Schema({});
followSchema.plugin(autopopulate);
const followNotification = Notification.discriminator('follow', followSchema);

const postAutoPopulated = {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    autopopulate: {
        select: {
            blogAttribution: blogAttribution,
            trail: -1,
        },
    },
};
const noteSchema = new Schema({
    post: postAutoPopulated,
});
noteSchema.plugin(autopopulate);
const likeNotification = Notification.discriminator('like', noteSchema);

const commentNotification = Notification.discriminator('comment', noteSchema);

const reblogSchema = new Schema({
    post: postAutoPopulated,
    yourPost: postAutoPopulated,
});
reblogSchema.plugin(autopopulate);
const reblogNotification = Notification.discriminator('reblog', reblogSchema);

// const askSubmittedNotification = Notification.discriminator('askSubmitted', new Schema({
//     question: postAutoPopulated,
// }));

// const askAnsweredNotification = Notification.discriminator('askAnswered', new Schema({
//     answer: postAutoPopulated,
// }));
const submissionSchema = new Schema({
    submission: postAutoPopulated,
});

const submissionNotification = Notification.discriminator('submission', submissionSchema);

const submissionAccepted = Notification.discriminator('submissionAccepted', submissionSchema);

module.exports = {
    Notification,
    followNotification,
    likeNotification,
    commentNotification,
    reblogNotification,
    // askSubmittedNotification,
    // askAnsweredNotification,
    submissionAccepted,
    submissionNotification,
};
