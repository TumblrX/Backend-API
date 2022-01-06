const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User');

const isColor = {
    validator: (v) => (v.match(/#[0-9abcdef]*/)[0].length === 7 && v.length === 7),
    message: 'invalid hex value',
};

const globalParametersSchema = new Schema({
    _id: false,
    backgroundColor: {
        type: String,
        validate: isColor,
        default: '#000000',
    },
    titleFont: {
        type: String,
        enum: {
            values: ['avalon', 'arquitecta', 'baskerville', 'bodoni', 'bookmania',
                'brutal type', 'calluna sans', 'capital', 'caslon fs', 'georgia', 'gibson', 'grumpy'],
            message: '{VALUE} is not supported in the body font',
        },
        default: 'gibson',
    },
    stretchHeaderImage: {
        type: Boolean,
        default: true,
    },
    accentColor: {
        type: String,
        validate: isColor,
        default: '#ffffff',
    },
    showAvatar: {
        type: Boolean,
        default: true,
    },
    showDescription: {
        type: Boolean,
        default: true,
    },
    showHeaderImage: {
        type: Boolean,
        default: true,
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
    titleColor: {
        type: String,
        validate: isColor,
        default: '#ffffff',
    },
    titleFontWeightIsBold: {
        type: Boolean,
        default: true,
    },
});

const customParametersScehma = new Schema({
    _id: false,
    slidingHeader: {
        type: Boolean,
        default: true,
    },
    showNavigation: {
        type: Boolean,
        default: true,
    },
    endlessScrolling: {
        type: Boolean,
        default: true,
    },
    syntaxHighlighting: {
        type: Boolean,
        default: false,
    },
    layout: {
        type: String,
        enum: {
            values: ['Regular', 'Wide', 'Minimal', 'Grid'],
            meesage: '{VALUE} is not a supported layout type',
        },
        default: 'Regular',
    },
    relatedPosts: {
        type: Boolean,
        default: true,
    },
});

const customApperanceSchema = new Schema({
    _id: false,
    truncateFeed: {
        type: Boolean,
        default: false,
    },
    openLinksInNewWindow: {
        type: Boolean,
        default: false,
    },
    postsPerPage: {
        type: Number,
        deafult: 10,
    },
    customTheme: {
        type: String,
        default: 'Tumblr offical',
    },
    enableMobileInterFace: {
        type: Boolean,
        default: false,
    },
    globalParameters: {
        type: globalParametersSchema,
        default: () => ({}),
    },
    customParameters: {
        type: customParametersScehma,
        default: () => ({}),
    },
});

const settingsSchema = new Schema({
    _id: false,
    shareLikes: {
        type: Boolean,
        default: true,
    },
    shareFollowing: {
        type: Boolean,
        default: true,
    },
    replies: {
        type: Boolean,
        default: true,
    },
    // true means everyone can reply
    // false means only tumblirs you follow
    allowSubmission: {
        type: Boolean,
        default: false,
    },
    allowAsk: {
        type: Boolean,
        default: false,
    },
    messaging: {
        type: Boolean,
        default: false,
    },
    hideFromSearch: {
        type: Boolean,
        default: false,
    },
    activatePassward: {
        type: Boolean,
        default: false,
    },
    blogAvatar: {
        type: Boolean,
        default: false,
        // On the Dashboard, followers will see authors' portraits in addition to this blog's portrait next to each post
    },
});

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Blog must have a title'],
        minLength: [3, 'Blog title can\'t be less than 3 chars'],
        maxlength: [20, 'Blog title cant\'t be mora than 20 chars'],
    },
    password: {
        type: String,
        default: 'none',
    },
    handle: {
        type: String,
        required: [true, 'a blog must have a handle'],
        unique: true,
        trim: true,
        minLength: [3, 'Bloghandle can\'t be less than 3 chars'],
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    isPrimary: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        trim: true,
        default: 'my new blog',
        minLength: [3, 'Blog description cant\'t be less than 3 chars'],
        maxlength: [255, 'Blog Blog description cant\'t be more than 255 chars'],
    },
    // You guessed it! The blog's description
    askAnon: Boolean,
    // indicates whether the blog allows anonymous questions
    // returned only if ask is true
    avatar: {
        type: String,
        default: 'https://assets.tumblr.com/images/default_avatar/cube_open_128.png',
    },
    isAvatarCircle: {
        type: Boolean,
        default: true,
    },
    headerImage: {
        type: String,
        default: 'uploads/blog/defaultHeader.png',
    },
    // single sized avater of size 128
    // which should each have a width, height, and URL
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post', required: false,
    }],
    followedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: false,
        default: undefined,
    }],
    blockedTumblrs: [{
        type: mongoose.ObjectId,
        default: undefined,
        ref: 'Blog',
    }],
    blockingMe: [{
        type: mongoose.ObjectId,
        default: undefined,
        ref: 'Blog',
    }],
    timezone: String,
    // The blog's configured timezone, such as "US/Eastern"
    // Only viewable by blog member. Partial response field ONLY.
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    // array of posts ids whose status is queued
    // arranged from oldest to most recent
    ask: [{
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: 'Post',
    }],
    customApperance: {
        type: customApperanceSchema,
        default: () => ({}),
    },
    settings: {
        type: settingsSchema,
        default: () => ({}),
    },
},
{
    timestamps: true,
});

blogSchema.pre('remove', async function(next) {
    // this hock is needed a blog is deleted
    await this.model('User').update({$pull: {blogs: this._id}});
    await this.model('User').update({$pull: {followingBlogs: this._id}});
    await this.model('User').update({$pull: {blockedBlogs: this._id}});
    await BlogModel.updateMany({$pull: {blockedTumblrs: this._id}});
    await BlogModel.updateMany({$pull: {blockingMe: this._id}});
    await this.model('Post').deleteMany({_id: {$in: this.posts}});
    next();
});

blogSchema.pre('deleteMany', async function(next) {
    // this hock is only needed when the user is deleted
    try {
        const deletedData = await BlogModel.find(this._conditions).lean();
        const blogIDs = deletedData.map((x) => x._id);
        await BlogModel.model('User').update({$pull: {followingBlogs: {$in: blogIDs}}});
        await BlogModel.model('User').update({$pull: {blockedBlogs: {$in: blogIDs}}});
        await BlogModel.updateMany({$pull: {blockedTumblrs: {$in: blogIDs}}});
        await BlogModel.updateMany({$pull: {blockingMe: {$in: blogIDs}}});
        const IDs = deletedData.map((x) => x.posts);
        await mongoose.model('Post').deleteMany({_id: {$in: IDs.flat()}});
        return next();
    } catch (error) {
        return next(error);
    }
});

const BlogModel = mongoose.model('Blog', blogSchema);
module.exports = {blogSchema, BlogModel};
