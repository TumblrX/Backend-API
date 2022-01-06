const {catchAsync} = require('../../errorHandler');
const {saveSettings} = require('../../userFuncitons/userFunctions');

module.exports = catchAsync(async (req, res) => {
    const result = await saveSettings(req.body, req.user._id);
    if (result > 0) {
        return res.status(200).json({status: 'success'});
    } else return res.status(403).json({status: 'Error'});
});
