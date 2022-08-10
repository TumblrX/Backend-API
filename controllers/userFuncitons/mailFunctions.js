const randomString = require('../utils/RandomString');
const {transporter1, transporter2} = require('../mailer');
const handlebars = require('handlebars');
const fs = require('fs');
const {setVerifyToken, setPasswordToken} = require('./redisFunctions');

/**
 * This function is used to generate a token for the user and save it in redis
 * @param {String} id This is the user id in the database
 * @return {String} The token that is saved in redis
 */
const SaveForgotPasswordToken = async function(id) {
    const token = randomString(64);
    await setPasswordToken(id, token);
    return token;
};


/**
 * This function is used to generate a token for the user and mail it to them
 * @param {String} id This is the user's id in the database
 * @param {String} email This is the user's email
 * @return {String} The result of email sending process
 */
const sendForgotPasswordEmail = async function(id, email) {
    const token = await SaveForgotPasswordToken(id);
    const url = 'http://tumblrx.me:4000/change-password?id=' + id + '&token=' + token;
    const html = fs.readFileSync('emails/forgotpassword.html', 'utf-8');
    const template = handlebars.compile(html);
    const htmlToSend = template({
        url: url,
    });
    const mailOptions = {
        from: 'TumblrX <tumblrxauth@gmail.com>',
        to: email,
        subject: 'TumblrX | Change Your Password',
        text: 'In order to change your password, please use the this URL: ' + url,
        html: htmlToSend,
    };
    let result = null;
    try {
        result = await transporter1.sendMail(mailOptions);
    } catch (error) {
        const mailOptions = {
            from: 'TumblrX <tumblrx2021@gmail.com>',
            to: email,
            subject: 'TumblrX | Change Your Password',
            text: 'In order to change your password, please use the this URL: ' + url,
            html: htmlToSend,
        };
        result = await transporter2.sendMail(mailOptions);
    }
    return result;
};

/**
 * This function is used to generate a token for the user and save it in redis
 * @param {String} id This is the user id in the database
 * @return {String} The token that is saved in redis
 */
const SaveVerificationToken = async function(id) {
    const token = randomString(64);
    await setVerifyToken(id, token);
    return token;
};


/**
 * This function is used to generate a token for the user and mail it to them
 * @param {String} id This is the user's id in the database
 * @param {String} email This is the user's email
 * @return {String} The result of email sending process
 */
const sendVerificationEmail = async function(id, email) {
    const token = await SaveVerificationToken(id);
    const url = 'http://tumblrx.me:4000/verify-email?id=' + id + '&token=' + token;
    const html = fs.readFileSync('emails/verifyemail.html', 'utf-8');
    const template = handlebars.compile(html);
    const htmlToSend = template({
        url: url,
    });

    const mailOptions = {
        from: 'TumblrX <tumblrxauth@gmail.com>',
        to: email,
        subject: 'TumblrX | Verify Your Email',
        text: 'In order to verify your email, please use the this URL: ' + url,
        html: htmlToSend,
    };

    let result = null;
    try {
        result = await transporter1.sendMail(mailOptions);
    } catch (error) {
        const mailOptions = {
            from: 'TumblrX <tumblrx2021@gmail.com>',
            to: email,
            subject: 'TumblrX | Verify Your Email',
            text: 'In order to verify your email, please use the this URL: ' + url,
            html: htmlToSend,
        };
        result = await transporter2.sendMail(mailOptions);
    }
    return result;
};


/**
 * This function is used to mail the new user's password it to them
 * @param {String} email This is the user's email
 * @param {String} password This is the user's new password
 * @return {String} The result of email sending process
 */
const sendNewPasswordEmail = async function(email, password) {
    const html = fs.readFileSync('emails/newpassword.html', 'utf-8');
    const template = handlebars.compile(html);
    const htmlToSend = template({
        password: password,
    });
    const mailOptions = {
        from: 'TumblrX <tumblrxauth@gmail.com>',
        to: email,
        subject: 'TumblrX | Your New Password',
        text: 'In order to access your account, please use the this password: ' + password,
        html: htmlToSend,
    };
    let result = null;
    try {
        result = await transporter1.sendMail(mailOptions);
    } catch (error) {
        const mailOptions = {
            from: 'TumblrX <tumblrxauth@gmail.com>',
            to: email,
            subject: 'TumblrX | Your New Password',
            text: 'In order to access your account, please use the this password: ' + password,
            html: htmlToSend,
        };
        result = await transporter2.sendMail(mailOptions);
    }
    return result;
};

module.exports = {
    sendForgotPasswordEmail: () => {},
    sendVerificationEmail: () => {},
    sendNewPasswordEmail: () => {},
};
