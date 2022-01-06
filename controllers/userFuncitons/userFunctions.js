const User = require('../../models/User');
const Blog = require('../../models/Blogs').BlogModel;
const jwt = require('jsonwebtoken');
const Post = require('../../models/Post');
const bcrypt = require('bcrypt');
const {delVerifyToken, delPasswordToken} = require('./redisFunctions');

/**
 * This function checks if user exists in the database
 * @param {UserObject} user
 * @return {String} Id id exists, Null if not
 */
const userExists = async function(user) {
    const result = await User.findOne({$or: [{email: user.email}, {username: user.username}, {_id: user._id}]});
    if (result) {
        return result._id;
    } else {
        return null;
    }
};


/**
 * This function checks if blog exists in the database
 * @param {BlogObject} blog
 * @return {Boolean} True if blog exists, False if not
 */
const primaryBlogExists = async function(blog) {
    const result = await Blog.findOne({$or: [{handle: blog.handle}, {_id: blog._id}]});
    if (result) {
        return true;
    } else {
        return false;
    }
};


/**
 * This function checks if user can be created such that it is unique in the database
 * @param {UserObject} user{username, email}
 * @return {Boolean} True if user can be created, False if not
 */
const canCreateUser = async function(user) {
    const userExist = await userExists(user);
    const blogExist = await primaryBlogExists({handle: user.username});
    if (userExist || blogExist) {
        return false;
    } else {
        return true;
    }
};


/**
 * This function updates user settings in the database based on the changed settings only
 * @param {Object} data The changed user settings
 * @param {String} id The user's id in the database
 * @return {Boolean} 1 if user is updated, 0 if not
 */
const saveSettings = async function(data, id) {
    const updateOps = {};
    for (const key of Object.keys(data)) {
        updateOps['settings.' + key] = data[key];
    }
    const result = await User.updateOne({_id: id}, {
        $set: updateOps,
    });
    return result.modifiedCount;
};


/**
 * This function updates user email verification status to true in the database
 * @param {String} id The user's id in the database
 */
const setEmailVerified = async function(id) {
    await User.updateOne({_id: id}, {$set: {isEmailVerified: true}});
    await delVerifyToken(id);
};

/**
 * This function updates user's password in the database and delete the "forget password" token
 * @param {String} id The user's id in the database
 * @param {String} password The user's new password
 */
const updatePasswordWithToken = async function(id, password) {
    await updateUserPassword(id, password);
    await delPasswordToken(id);
};

/**
 * This function hashes and updates user's password in the database
 * @param {String} id The user's id in the database
 * @param {String} password The user's new password
 */
const updateUserPassword = async function(id, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.updateOne({_id: id}, {$set: {password: hashPassword}});
};

/**
 * This function sends users's info along with his JWT token in the response
 * @param {String} req The client's request
 * @param {String} res The server's response
 * @return {Object} User's data
 */
const sendJWT = function(req, res) {
    const token = jwt.sign({_id: req.user._id, primaryBlog: req.user.primaryBlog}, process.env.TOKEN_SECRET);
    const user = req.user;
    user.blogs.push(user.primaryBlog);
    return res.header('Authorization', token).status(200).json({
        'status': 'success',
        token,
        'id': user._id,
        'name': user.username,
        'email': user.email,
        'isEmailVerified': user.isEmailVerified,
        'primary_blog': user.primaryBlog,
        'following': (user.followingBlogs ? user.followingBlogs.length : 0),
        'followingTags': user.followingTags,
        'default_post_format': 'html',
        'likes': (user.likedPosts ? user.likedPosts.length : 0),
        'blogs': user.blogs,
        'settings': user.settings,
    });
};

/**
 * This function calculates how many posts a user has in each blog
 * @param {Object} user The user's data
 * @return {Object} The number of posts in each blog
 */
const getPostsPerBlog = async function(user) {
    const blogs = user.blogs;
    blogs.push(user.primaryBlog);
    const postsCountsJson = await Post.postModel.aggregate([{
        $match: {
            blogAttribution: {'$in': blogs}, state: 'published',
        },
    }, {
        $group: {
            _id: '$blogAttribution',
            count: {$sum: 1},
        },
    }]);
    const postsCount = {};
    postsCountsJson.forEach((element) => {
        postsCount[element._id] = element.count;
    });
    return postsCount;
};

/**
 * This function returns user's blogs info in details
 * @param {Object} user The user's data
 * @return {Object} The user's blogs info
 */
const getUserBlogs = async function(user) {
    const populatedUser = await User.findById(user.id).populate('blogs').populate('primaryBlog');
    const blogs = populatedUser.blogs;
    blogs.unshift(populatedUser.primaryBlog);
    return blogs;
};

/**
 * This function adds a flag to posts if the user has liked it
 * @param {ArrayOfPosts} posts The posts to add flag to
 * @param {Object} user The user's data
 * @return {ArrayOfPosts} The posts after adding like flag
 */
const addIsLikedToPostsJSON = (posts, user) => {
    let likedPosts = user && user.likedPosts;
    if (likedPosts === undefined) {
        likedPosts = [];
    }
    const newPosts = [];
    for (const post of posts) {
        const index = likedPosts.findIndex((id) => id.equals(post._id));
        const index2 = likedPosts.findIndex((id) => id.equals(post.trail[0]?._id));
        const newPost = JSON.parse(JSON.stringify(post));
        newPost.liked = index !== -1 || index2 !== -1;
        newPosts.push(newPost);
    }
    return newPosts;
};

/**
 * This function adds an array of tags to post if the user follows any of its tags
 * @param {ArrayOfPosts} posts The posts to add array to
 * @param {Array} followingTags The tags the user follows
 * @return {ArrayOfPosts} The posts after adding the array to
 */
const addTagFlagToPost = function(posts, followingTags) {
    return posts.map((x) => {
        const intersectionArray = x.tags.filter((value) => followingTags.includes(value));
        y = JSON.parse(JSON.stringify(x));
        if (intersectionArray.length > 0) {
            y['youFollowTheseTags'] = intersectionArray;
        }
        return y;
    });
};

/**
 * This function gets the posts of the blogs and tags the user follows based on his current page
 * @param {ArrayOfBlogs} blogs The blogs the user follows
 * @param {ArrayOfStrings} followingTags The tags the user follows
 * @param {String} page The users current page (default is 1)
 * @param {String} limit The number of posts to return (default is 10)
 * @return {ArrayOfPosts} The posts array
 */
const getPostsForUser = async function(blogs, followingTags, page, limit) {
    if (!page) {
        page = '1';
    }
    if (!limit) {
        limit = '10';
    }
    const blogIds = blogs.map((x) => x._id);
    const posts = await Post.postModel.find({
        $and: [
            {$or: [{blogAttribution: {$in: blogIds}}, {tags: {$in: followingTags}}]},
            {state: 'published'},
        ],
    }).limit(parseInt(limit))
        .skip(parseInt(limit) * (parseInt(page) - 1))
        .sort('-publishedOn');
    return addTagFlagToPost(posts, followingTags);
};


/**
 * This function finds the other users who follows this user back
 * @param {Object} user The user's data
 * @return {ArrayOfUsers} The user's who follow this user back
 */
const getUserFriends = async function(user) {
    const friends = await User.aggregate([
        {
            $set: {
                blogs: {
                    $setUnion: [
                        ['$primaryBlog'], '$blogs',
                    ],
                },
            },
        },
        {
            $set: {
                MyFollowers: {
                    $setIntersection: [
                        [...user.blogs, user.primaryBlog],
                        '$followingBlogs',
                    ],
                },
            },
        },
        {
            $match: {
                MyFollowers: {
                    $not: {
                        $size: 0,
                    },
                },
            },
        },
        {
            $set: {
                IFollow: {
                    $setIntersection: [
                        user.followingBlogs,
                        '$blogs',
                    ],
                },
            },
        },
        {
            $match: {
                IFollow: {
                    $not: {
                        $size: 0,
                    },
                },
            },
        },
    ]);
    return friends;
};

/**
 * This function adds a flag to blog is its owner is friend of the user
 * @param {Object} user The user's data
 * @param {Object} blogs The blogs to add flag to
 * @return {ArrayOfBlogs} The blogs after adding flag
 */
const addFriendsToBlogs = async function(user, blogs) {
    let friends = await getUserFriends(user);
    friends = friends.map((x) => x.primaryBlog.toString());
    return blogs.map((x) => {
        if (friends.includes(x._id.toString())) {
            y = JSON.parse(JSON.stringify(x));
            y['friends'] = true;
            return y;
        } else {
            y = JSON.parse(JSON.stringify(x));
            y['friends'] = false;
            return y;
        }
    });
};


/**
 * This extracts tags and photos from posts which has both
 * @param {ArrayOfPosts} postsWithTags Posts which has both tags and photos
 * @return {Object} Object of tags as key and photos as value
 */
const getTagsPhotosFromPostsWithTags = async function(postsWithTags) {
    const tagsWithPhotos = {};
    postsWithTags.forEach((post) => {
        const links = [];
        post.content.forEach((c) => {
            if (c.type == 'image') {
                links.push(c.url);
            }
        });
        if (!tagsWithPhotos[post.tags[0]]) {
            tagsWithPhotos[post.tags[0]] = links;
        } else {
            tagsWithPhotos[post.tags[0]] = tagsWithPhotos[post.tags[0]].concat(links);
        }
    });
    return tagsWithPhotos;
};

/**
 * This function hashes and updates user's password in the database
 * @param {String} email The user's email in the database
 * @param {String} password The user's new password
 */
const setNewPassword = async function(email, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({email: email}, {password: hashPassword});
};

module.exports = {
    userExists,
    primaryBlogExists,
    canCreateUser,
    saveSettings,
    setEmailVerified,
    sendJWT,
    getPostsPerBlog,
    getUserBlogs,
    getPostsForUser,
    updatePasswordWithToken,
    updateUserPassword,
    getUserFriends,
    addFriendsToBlogs,
    addIsLikedToPostsJSON,
    getTagsPhotosFromPostsWithTags,
    setNewPassword,
    addTagFlagToPost,
};
