const {catchAsync} = require('../../errorHandler');
const User = require('../../../models/User');
const isEmpty = require('../../utils/isEmpty');

module.exports = catchAsync(async (req, res) => {
    const tag = req.body.tag;
    if (!isEmpty(tag)) {
        if (req.user.followingTags.includes(tag)) {
            return res.status(400).json({
                'status': 'failed',
                'message': 'You\'re already following this tag',
            });
        } else {
            await User.updateOne({_id: req.user.id}, {
                $push: {followingTags: tag},
            });
            return res.status(200).json({
                'status': 'success',
                'message': 'Tag is followed',
            });
        }
    } else {
        return res.status(400).json({
            'status': 'failed',
            'message': 'Please enter a tag to follow',
        });
    }
});

