// Validation
const joi = require('joi');
//* Added those validation to the model so they are not needed here
// const registerSchema = joi.object({
//     blogName: joi.string().min(3).required(),
//     email: joi.string().min(6).required().email(),
//     password: joi.string().min(6).required(),
// });
//* password validation is needed though
const passwordValidator = joi.string().min(6).required();
const emailValidator = joi.string().min(6).required().email();
const _idValidator = joi.string().min(8).required();

const deleteSchema = joi.object({
    email: emailValidator,
    password: passwordValidator,
});
const isColor = {
    validator: (v) => (v.match(/#[0-9abcdef]*/)[0].length === 7 && v.length === 7),
    message: ' invalid hex value',
};
module.exports = {
    passwordValidator: passwordValidator,
    emailValidator: emailValidator,
    _idValidator: _idValidator,
    deleteSchema: deleteSchema,
    isColor,
};
