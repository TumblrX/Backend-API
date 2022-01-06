const pusher = require('../utils/notifications').pusher;
const AppError = require('../utils/appError');
const catchAsync = require('../errorHandler').catchAsync;
const {Notification} = require('../../models/Notification');

// const notifier = require('../utils/notifications');
/**
 * auth
 * @param  {Request} req request
 * @param  {Response} res response
 * @param  {function} next next
 */
exports.auth = catchAsync(async (req, res, next) => {
    if (req.body.channel_name === `private-${req.user._id}`) {
        const auth = pusher.authenticate(req.body.socket_id, req.body.channel_name, {
            user_id: req.user._id,
        });
        res.send(auth);
    } else {
        next(new AppError('Forbidden', 403));
    }
});

exports.blogNotifications = catchAsync(async (req, res, next) => {
    const blog = req.params.blogId;
    const limit = (req.query.limit * 1) || 20;
    const start = (req.query.start * 1) || 0;
    if (req.user.canWriteToBlog(blog)) {
        const notifications = await Notification.find({blog}).sort('-createdAt').skip(start).limit(limit);
        res.json({notifications});
    } else {
        return next(new AppError('Forbidden', 403));
    }
});
exports.userNotifications = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const limit = (req.query.limit * 1) || 20;
    const start = (req.query.start * 1) || 0;
    res.json({
        notifications: await Notification.find({userId: userId})
            .sort('-createdAt')
            .skip(start)
            .limit(limit),
        unReadCount: await Notification.find({userId, wasRead: false})
            .count(),
    });
});

exports.markAs = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const ids=req.body.ids;
    let markAs=req.body.markAs||true;
    const query={userId};
    if (ids) {
        query._id={$in: ids.map((id)=>require('mongoose').Types.ObjectId(id))};
    } else {
        markAs= true;
    }
    await Notification.updateMany(query, {wasRead: markAs});
    res.json({status: 'success'});
});
