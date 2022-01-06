const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {passwordValidator, emailValidator} = require('../../validation');
const User = require('../../../models/User');
const {catchAsync} = require('../../errorHandler');
const AppError = require('../../utils/appError');
const {canCreateUser, sendJWT} = require('../../userFuncitons/userFunctions');
const {sendVerificationEmail} = require('../../userFuncitons/mailFunctions');

const register = catchAsync(async (req, res, next) => {
    // Password Check
    const {error} = passwordValidator.validate(req.body.password);
    if (error) {
        return res.status(400).json({
            'status': 'Failed',
            'message': 'Invalid Password',
            'symbol': '1',
        });
    }
    // Email Check
    const result = emailValidator.validate(req.body.email);
    if (result.error) {
        return res.status(400).json({
            'status': 'Failed',
            'message': 'Invalid Email',
            'symbol': '2',
        });
    }
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json({
            'status': 'Failed',
            'message': 'Email Already Exists',
            'symbol': '3',
        });
    }
    //* Email is Unique mongoose will not let us save it twice.
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // Create user
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    });
    if (!(await canCreateUser(user))) {
        return res.status(400).json({
            'status': 'Failed',
            'message': 'Blog Name Already Exists',
            'symbol': '4',
        });
    }
    await user.save();
    user = await User.findOne({email: req.body.email});
    // Create and assign a token
    const token = jwt.sign({_id: user._id, primaryBlog: user.primaryBlog}, process.env.TOKEN_SECRET);
    try {
        await sendVerificationEmail(user._id, req.body.email);
    } catch (error) {
        console.log(error);
    }
    user.blogs.push(user.primaryBlog);
    return res.header('Authorization', token).status(200).json({
        'status': 'success',
        'symbol': '5',
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
});

const login = catchAsync(async (req, res, next) => {
    // Validation
    // Check if valid email
    const result = emailValidator.validate(req.body.email);
    if (result.error) return next(new AppError('Invalid Email', 403));
    // Check if valid password
    const {error} = passwordValidator.validate(req.body.password);
    if (error) return next(new AppError('Invalid Password', 403));
    // Check if email already exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return next(new AppError('Wrong email or password', 400));
    // Check Valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return next(new AppError('Wrong email or password', 400));
    // Create and assign a token
    req.user = user;
    return sendJWT(req, res);
});


module.exports = {register, login};
