const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const verified = await jwt.verify(token || '', process.env.TOKEN_SECRET);
        req.user = await User.findById(verified._id);
    } catch (_) {
    }
    next();
};
