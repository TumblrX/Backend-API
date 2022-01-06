const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
});

/**
 * notify the user with {userId} with about {eventName}
 * @async
 * @param {ObjectId | string} userId the user id that you want to notify
 * @param {string} eventName the event name
 * @param {Object | string} notificationBody notification body
 * @return {Response} pusher response
 */
const notifyUser = async (userId, eventName, notificationBody) => {
    console.log('notify '+ userId);
    return await pusher.trigger(`private-${userId}`, eventName, notificationBody);
};
/**
 * notify the blog owner about {eventName}
 * @async
 * @param {Blog} blog the user id that you want to notify
 * @param {string} eventName the event name
 * @param {Object | string} notificationBody notification body
 * @returns {Response} pusher response
 */

const notifyBlog = async (blog, eventName, notificationBody) => {
    console.log(blog);
    return notifyUser(blog.owner, eventName, notificationBody);
};


module.exports = {pusher, notifyBlog, notifyUser};

