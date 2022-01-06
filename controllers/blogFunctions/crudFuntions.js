const {catchAsync} = require('../errorHandler');
const AppError = require('../utils/appError');
const Blog = require('../../models/Blogs');
const Post = require('../../models/Post').postModel;
const User = require('../../models/User');
const validator = require('../validation');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const {customVerifyToken} = require('../userFuncitons/exploreFunctions');
const ObjectId = require('mongoose').Types.ObjectId;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join('views', 'uploads', 'blog'));
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, `blog-${Date.now()}-${req.params.blogId}.${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (type === 'image') {
        cb(null, true);
    } else {
        cb(new AppError(`wrong file format`, 400), false);
    }
};

const upload = multer({storage, fileFilter});

/**
 * function to check if the sent string can be converted to json format
 * @async
 * @function isJSON
 * @param {String} str
 * @return {Boolean}
 */
const isJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * function to check if the sent request is empty or not
 * return false if empty request
 * return true if not empty request
 * @async
 * @function validRequest
 * @param {Object} body
 * @param {Array} files
 * @return {Boolean}
 */
const validRequest = (body, files) => {
    // Update custome appearence
    // check if no data is sent or no images are send
    if ((Object.keys(body).length === 0 || !body.data || body.data === '') &&
        (!files || Object.keys(files).length === 0)) {
        return false;
    }
    return true;
};

/**
 * function to check if the sent blogId belongs to the user makeing the request
 * @async
 * @function belong
 * @param {Object} blogs
 * @param {String} primaryBlog
 * @param {String} blogId
 * @return {Boolean}
 */
const belong = (blogs, primaryBlog, blogId) => {
    // check if the blog whose ID in the params belongs to the user making the request
    if (blogs.indexOf(blogId) === -1 && primaryBlog !== blogId) {
        return false;
    }
    return true;
};

/**
 * fuction to convert the sent data in the request body to json format
 * returns true the user sent some data
 * return false if the user did not
 * @async
 * @function checkData
 * @param {Object} body
 * @param {Object} blog
 * @return {Boolean}
 */
const checkData = async (body, blog) => {
    if (body && body !== NaN) {
        const updateOps = {};
        for (const key of Object.keys(body)) {
            if (key == 'customApperance') {
                for (const customKey of Object.keys(body.customApperance)) {
                    if (customKey == 'globalParameters') {
                        for (const globalParametersKey of Object.keys(body.customApperance.globalParameters)) {
                            updateOps['customApperance.globalParameters.' +
                                globalParametersKey] = body.customApperance.globalParameters[globalParametersKey];
                        }
                    } else if (customKey == 'customParameters') {
                        for (const customParametersKey of Object.keys(body.customApperance.customParameters)) {
                            updateOps['customApperance.customParameters.' +
                                customParametersKey] = body.customApperance.customParameters[customParametersKey];
                        }
                    } else {
                        updateOps['customApperance.' + customKey] = body.customApperance[customKey];
                    }
                }
            } else {
                if (key == 'isPrivate' && (body[key] === 'true' || body[key] === true)) {
                    if (blog.isPrimary) return 'blog is primary and cann\'t be private';
                    // check if the blog is to be private then a password should be sent
                    if (!(Object.keys(body).includes('password'))) {
                        return 'missing password';
                    }
                } else if (key == 'password') {
                    if (body['isPrivate'] && (body['isPrivate'] === 'true' || body['isPrivate'] === true)) {
                        // if the body has property password then hash that password
                        body[key] = await bcrypt.hash(body[key], 10);
                    } else {
                        body[key] = 'none';
                    }
                }
                updateOps[key] = body[key];
            }
        }
        await blog.updateOne({$set: updateOps});
        return 'true';
    }
    return 'bad request';
};

/**
 * function to check if the user uploaded any images
 * if the user uploaded any images, it updated the blog avatar and imageHeader accordingly
 * @async
 * @function CheckImage
 * @param {Request} req
 * @param {Object} blog
 */
const CheckImage = async (req, blog) => {
    // check if an image is sent
    if (Object.keys(req.files).length > 1) {
        if (req.files[0].fieldname === 'avatar') {
            await blog.updateOne({avatar: `uploads/blog/${req.files[0].filename}`});
            await blog.updateOne({headerImage: `uploads/blog/${req.files[1].filename}`});
        } else {
            await blog.updateOne({avatar: `uploads/blog/${req.files[1].fieldname}`});
            await blog.updateOne({headerImage: `uploads/blog/${req.files[0].filename}`});
        }
    } else if (Object.keys(req.files).length > 0) {
        if (req.files[0].fieldname === 'avatar') {
            await blog.updateOne({avatar: `uploads/blog/${req.files[0].filename}`});
        } else {
            await blog.updateOne({headerImage: `uploads/blog/${req.files[0].filename}`});
        }
    }
};

/**
 * middleware that updates the custome appearence of the blog
 * @async
 * @function updateLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const updateLogic = (catchAsync(async (req, res, next) => {
    // if (!validRequest(req.body, req.files)) return next(new AppError('Empty Request', 400));
    if (!belong(req.user.blogs, req.user.primaryBlog.toString(), req.params.blogId)) {
        return next(new AppError('This blog is not yours!'));
    }
    const blog = await Blog.BlogModel.findOne({_id: req.params.blogId});
    const checkDataMessage = await checkData(req.body, blog);
    if (checkDataMessage !== 'true') {
        return next(new AppError(checkDataMessage, 400));
    }
    if (req.files) {
        await CheckImage(req, blog);
    }
    res.send({message: 'updated'});
}));

// Delete
/**
 * function to check if the sent email and password belong to the user makeing the request;
 * return false if the sent data is wrong
 * else return true
 * @async
 * @function checkEmailPassword
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {Object} body
 * @return {Boolean}
 */
const checkEmailPassword = async (userEmail, userPassword, body) => {
    const {error} = validator.deleteSchema.validate(body);
    if (error) return false;
    // Checking if data passed are related to that user
    if (userEmail !== body.email) return false;
    const validPass = await bcrypt.compare(body.password, userPassword);
    if (!validPass) return false;
    return true;
};

/**
 * function that deletest the user if the sent blog id is the primary blog id, or deletes the secondary blog
 * returns false if the send blog id does not belong to user makeing the request
 * else return true
 * @async
 * @function deleteBlog
 * @param {Object} user
 * @param {String} blogId
 * @return {Boolean}
 */
const deleteBlog = async (user, blogId) => {
    if (user.primaryBlog == blogId) {
        await user.remove();
        const blog = await Blog.BlogModel.findOne({_id: user.primaryBlog});
        await blog.remove();
    } else if (user.blogs.indexOf(blogId) !== -1) {
        // deleting the blog
        const blog = await Blog.BlogModel.findOne({_id: blogId});
        await blog.remove();
    } else {
        return false;
    }
    return true;
};

/**
 * middleware to delete the blog primary or secondry
 * @async
 * @function deleteLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const deleteLogic = catchAsync(async (req, res, next) => {
    if (!(await checkEmailPassword(req.user.email, req.user.password, req.body))) {
        return next(new AppError('Wrong email or password', 400));
    }
    if (!(await deleteBlog(req.user, req.params.blogId))) return next(new AppError('This blog is not yours!', 400));
    res.send({
        message: 'Successfull Operation',
    });
});

// Create
/**
 * function to check if the blog to be created is private or public
 * if private then check for sent password
 * return the hashed password of the blog
 * return true if blog is private but to password is sent
 * return none if blog if public
 * @async
 * @function checkCreate
 * @param {Object} body
 * @return {String}
 */
const checkCreate = async (body) => {
    if ((typeof(body.private) === 'boolean' && body.private) ||
    (typeof(body.private) === 'string' && body.private === 'true')) {
        if (body.password) {
            // If the blog is private then hash the blog's password
            const {error} = validator.passwordValidator.validate(body.password);
            if (error) return 'true';
        } else {
            return 'true';
        }
        return await bcrypt.hash(body.password, 10);
    } else {
        // The blog is public the default value for no password is none
        // The password can not be less than 6 characters long
        return 'none';
    }
};

/**
 * function that create a blog and return the created blog
 * @async
 * @function createBlog
 * @param {Request} req
 * @param {String} hashPassword
 * @return {Object}
 */
const createBlog = async (req, hashPassword) => {
    const blog = new Blog.BlogModel({
        handle: req.body.handle,
        title: req.body.title,
        isPrivate: req.body.private,
        owner: req.user._id,
        password: hashPassword,
    });
    const savedBlog = await blog.save();
    // Add the created blog to the user
    await User.updateOne({_id: req.user._id}, {$push: {blogs: savedBlog._id}});
    return savedBlog;
};

/**
 * function to check if the there exists a blog with such handle
 * if exits return true
 * else return false
 * @async
 * @function isRepeatedHandle
 * @param {String} handle
 * @return {Boolean}
 */
const isRepeatedHandle = async (handle) => {
    const blog = await Blog.BlogModel.findOne({handle: handle});
    if (blog) return true;
    return false;
};

/**
 * middleware that creates a new blog from request body
 * @async
 * @function createLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const createLogic = catchAsync(async (req, res, next) => {
    if (await isRepeatedHandle(req.body.handle)) return next(new AppError('Handle is already taken', 400));
    const hashPassword = await checkCreate(req.body);
    if (hashPassword === 'true') return next(new AppError('Bad Request', 400));
    const savedBlog = await createBlog(req, hashPassword);
    res.status(201).send({
        status: 'Created',
        data: savedBlog,
    });
});

// get
/**
 * function to check if there exits a blod with such id
 * return the blog if found
 * else return empty object
 * @async
 * @function checkFound
 * @param {ObjectId} blogId
 * @return {Object}
 */
const checkFound = async (blogId) => {
    // check if the sent blogId can be converted to ObjectId
    if (ObjectId.isValid(blogId)) {
        const id = ObjectId(blogId);
        const blog = await Blog.BlogModel.findOne({$or: [{handle: blogId}, {_id: id}]});
        return blog;
    }
    const blog = await Blog.BlogModel.findOne({handle: blogId});
    return blog;
};

/**
 * function to check if the blog is private or public
 * return true if public
 * return false
 * @function checkPrivate
 * @param {Boolean} isPrivate
 * @return {Boolean}
 */
const checkPrivate = (isPrivate) => {
    if (isPrivate) return false;
    return true;
};

/**
 * function to retrieve all the blogs that belong to sent blog
 * if the blog has no posts, return empty array
 * @async
 * @function
 * @param {Object} blog
 * @return {Array}
 */
const retrievePosts = async (blog) => {
    const posts = await Post
        .find({blogAttribution: blog._id, state: 'published'})
        .sort({publishedOn: 'desc'})
        .limit(10);
    return posts;
};

const formResponse = async (blog, flag) => {
    let response = {};
    if (flag) {
        // if the user is the owner of this blog
        const numPublishedPosts = await Post.find({blogAttribution: blog._id, state: 'published'}).count();
        const numDraftPosts = await Post.find({blogAttribution: blog._id, state: 'draft'}).count();
        response = {
            '_id': blog._id,
            'handle': blog.handle,
            'title': blog.title,
            'description': blog.description,
            'avatar': blog.avatar,
            'headerImage': blog.headerImage,
            'isAvatarCircle': blog.isAvatarCircle,
            'globalParameters': blog.customApperance.globalParameters,
            'customParameters': blog.customApperance.customParameters,
            'isPrimary': blog.isPrimary,
            'ownBlog': flag,
            'NumOfFollowers': blog.followedBy.length,
            'NumOfDrafts': numDraftPosts,
            'NumOfPosts': numPublishedPosts,
        };
        return response;
    }
    // the user made the request is not the one ownning the blog
    let avatar = 'none';
    let headerImage = 'none';
    if (blog.customApperance.globalParameters.showAvatar) {
        avatar = blog.avatar;
    }
    if (blog.customApperance.globalParameters.showHeaderImage) {
        headerImage = blog.headerImage;
    }
    response = {
        '_id': blog._id,
        'handle': blog.handle,
        'title': blog.title,
        'description': blog.description,
        'avatar': avatar,
        'headerImage': headerImage,
        'isAvatarCircle': blog.isAvatarCircle,
        'globalParameters': blog.customApperance.globalParameters,
        'customParameters': blog.customApperance.customParameters,
        'isPrimary': blog.isPrimary,
        'ownBlog': flag,
        'ownerId': blog.owner,
    };
    return response;
};

/**
 * function that returns true if the two arrays have something in common
 * return false if no intersection between these two arrays
 * @function
 * @param {array} blockedTumblrs
 * @param {array} userBlogs
 * @return {boolean}
 */
const getArraysIntersection = (blockedTumblrs, userBlogs) => {
    for (let i = 0; i < userBlogs.length; i++) {
        if (blockedTumblrs.indexOf(userBlogs[i]) !== -1) {
            return true;
        }
    }
    return false;
};

/**
 * middleware returns the blog whose id or handle is sent in the request body
 * @async
 * @function getLogic
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
const getLogic = catchAsync(async (req, res, next) => {
    // check if the user is logged in or not
    let user = NaN;
    if (req.header('Authorization')) {
        user = await customVerifyToken(req.header('Authorization'));
    }
    // check if there is a blog with such handle
    const blog = await checkFound(req.params.blogId);
    if (!blog) return next(new AppError('No such blog was found', 400));
    // check if the blog is private so don't show its content
    // incase the user made the request is not the owner of the blog
    if (!checkPrivate(blog.isPrivate) && user === NaN) return next(new AppError('This blog is private', 400));
    if (user && !checkPrivate(blog.isPrivate)) {
        // check if the user owns that private blog
        // if the user makeing the request is one of the followers of that blog
        // then he/she can view the content of that blog
        if (!(blog.owner.equals(user._id) || blog.followedBy.indexOf(user.primaryBlog) !== -1)) {
            return next(new AppError('This blog is private', 400));
        }
    }
    // check if the user makeing the request has one of its blogs blocked by the blog he/she searching for
    const userBlogs = user.blogs;
    userBlogs.push(user.primaryBlog);
    const intersection = getArraysIntersection(blog.blockedTumblrs, userBlogs);
    if (intersection && !blog.owner.equals(user._id)) {
        return next(new AppError('you are blocked by that tumblr', 400));
    }
    // if the user is loggedin then check if that blog belongs to that user
    let flag = false;
    if (user) {
        const userPrimaryBlogId = user.primaryBlog.toString();
        const blogId = blog._id.toString();
        if (userPrimaryBlogId === blogId || user.blogs.includes(blog._id)) {
            flag = true;
        }
    }
    const responseObject = await formResponse(blog, flag);
    res.status(200).json(responseObject);
});
/**
 * search for blogs
 * @param {string} query query to search for
 * @param {Number} limit result length
 * @param {Number} start start index
 * @return {Array} array of blogs match this criteria.
 */
const searchBlogs = async (query, limit, start) => {
    if (!query) return [];
    const matchBlock = {
        $regex: query,
        $options: 'ix',
    };
    limit = (limit * 1) || 20;
    start = (start * 1) || 0;
    return await Blog.BlogModel.find(
        {
            $and: [
                {isPrivate: false},
                {
                    $or: [
                        {
                            handle: matchBlock,
                        },
                        {
                            title: matchBlock,
                        },
                    ],
                },
            ],
        })
        .skip(start)
        .limit(limit)
        .select({
            password: false,
            isPrimary: false,
            isPrivate: false,
            settings: false,
        });
};
/**
 * check if user is following a blog
 * @param {blog} blog
 * @param {user} user
 * @return {Boolean}
 */
const follows = (blog, user) => {
    if (!user) {
        return false;
    } else {
        const index = user.followingBlogs.findIndex((id) => id.equals(blog._id));
        return index !== -1;
    }
};
/**
 * adds is followed flag to a blog
 * @param {Array} blog
 * @param {User} user
 */
const addIsFollowingToABlog = (blog, user) => {
    blog.isFollowed = follows(blog, user);
};
/**
 * adds is followed flag to blogs array
 * @param {Array} blogs array of blogs
 * @param {User} user
 */
const addIsFollowingToBlogs = (blogs, user) => {
    for (const blog of blogs) {
        addIsFollowingToABlog(blog, user);
    }
};
module.exports = {
    addIsFollowingToBlogs, addIsFollowingToABlog,
    upload, updateLogic, deleteLogic, createLogic, getLogic, searchBlogs,
    validRequest, belong, isJSON, checkData, checkEmailPassword, checkCreate, checkFound, checkPrivate, retrievePosts,
    getArraysIntersection, CheckImage,
};
