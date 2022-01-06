/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const {BlogModel} = require('./Blogs');
const {ChatModel} = require('./Chat');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true,
        minLength: [3, 'username can\'t be less than 3 chars'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    //* NO NEED TO SAVE SALT AND PASSWORD Separately since
    //* bcrypt concatenates them.
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    // lastIp: String,
    primaryBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    // the main blog for this user
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    // array of blog ids that the user have
    followingBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    // array of blog ids that the user follow
    followingTags: [String],
    // array of tags that the user follows
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    blockedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    settings: {
        actionNotify: {type: Boolean, default: true},
        findMeByEmail: {type: Boolean, default: true},
        dashBoardInfiniteScrolling: {type: Boolean, default: true},
        hide_likes: {type: Boolean, default: false},
        hideFollowing: {type: Boolean, default: false},
        showTimestampOnPosts: {type: Boolean, default: false},
        messagingSounds: {type: Boolean, default: false},
    },
    notifications: [{
        postID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', required: false,
        },
        blogID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog', required: false,
        },
        timestamp: {type: Date, default: Date.now},
        description: {type: String, required: true},
    }],
    // array of posts ids that the user likes
    // followingBlogs: Number,
    // number of blogs that the user follow
    // likes: Number,
    // The total count of the user's likes
},
{
    timestamps: true,
});
//  this will run before creating anew use
userSchema.pre('save', async function(next) {
    if (!this.primaryBlog) {
        const blog = await BlogModel.create({
            handle: this.username,
            title: 'Untitled',
            owner: this._id,
            isPrimary: true,
        });
        this.primaryBlog = blog._id;
    }
    next();
});

// deleting all blogs belonging to a user, if that user is deleted
userSchema.pre('remove', async function(next) {
    await this.model('Blog').deleteMany({_id: {$in: this.blogs}});
    await this.model('Blog').update({$pull: {followedBy: this.primaryBlog}});
    await ChatModel.deleteMany({$or: [{user1: this._id}, {user2: this._id}]});
    next();
});

const User = mongoose.model('User', userSchema);

/**
 * check if user can write to a blog.
 * @function canWriteToBlog
 * @param {Object} blogId
 * @return {Boolean}
 */
User.prototype.canWriteToBlog = function(blogId) {
    let canWriteToBlog = this.primaryBlog.equals(blogId);
    canWriteToBlog = canWriteToBlog || this.blogs.find((bid) => bid.equals(blogId));
    if (canWriteToBlog) {
        return true;
    } else {
        return false;
    }
};
/**
 * get all blogs that the user can write to.
 * @function getAllBlogs
 * @return {Array} array of ids of the blogs that this user own.
 */
User.prototype.getAllBlogs = function() {
    return [this.primaryBlog, ...this.blogs];
};

module.exports = User;


