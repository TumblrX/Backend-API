const User = require('../../models/User');
const {OAuth2Client} = require('google-auth-library');
const randomString = require('../utils/RandomString');

/**
 * This function is used to get user information from google using id_token
 * @param {String} idToken This is the token that google sends to the client
 * @return {Object} payload of the user which is the information of the user
 */
const getPayloadFromGoogle = async function(idToken) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
};


/**
 * This function is used to create a new user in the database based on google information
 * @param {Object} payload of the user which is the information of the user
 */
const createUserFromPayload = async function(payload) {
    const user = new User({
        username: payload.name.replace(/\s/g, '') + Math.floor(1000 + Math.random() * 9000),
        email: payload.email,
        password: randomString(60),
        avatar: payload.picture,
    });
    await user.save();
};

module.exports = {
    getPayloadFromGoogle,
    createUserFromPayload,
};
