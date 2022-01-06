// eslint-disable-next-line prefer-const
let getVerifyToken = async () => void 0;
// eslint-disable-next-line prefer-const
let getPasswordToken = async () => void 0;
// eslint-disable-next-line prefer-const
let delVerifyToken = async () => void 0;
// eslint-disable-next-line prefer-const
let delPasswordToken = async () => void 0;
// eslint-disable-next-line prefer-const
let setVerifyToken = async () => void 0;
// eslint-disable-next-line prefer-const
let setPasswordToken = async () => void 0;

// if (process.env.NODE_ENV === 'production') {
//     const redis = require('redis');
//     client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
//     /**
//      *
//      * @param {id} id of the user
//      * @return {token} token of the user stored in redis
//      */
//     getVerifyToken = async function(id) {
//         await client.connect();
//         const token = await client.get(id + 'email');
//         client.disconnect();
//         return token;
//     };


//     /**
//      *
//      * @param {id} id of the user
//      * @return {token} token of the user stored in redis
//      */
//     getPasswordToken = async function(id) {
//         await client.connect();
//         const token = await client.get(id + 'password');
//         client.disconnect();
//         return token;
//     };

//     delVerifyToken = async function(id) {
//         client.connect().then(() => {
//             client.del(id + 'email').then(() => {
//                 client.disconnect();
//             });
//         });
//     };


//     delPasswordToken = async function(id) {
//         client.connect().then(() => {
//             client.del(id + 'password').then(() => {
//                 client.disconnect();
//             });
//         });
//     };


//     setVerifyToken = async function(id, token) {
//         client.connect().then(() => {
//             client.setEx(id + 'email', 86400, token + '').then(() => {
//                 client.disconnect();
//             });
//         });
//     };


//     setPasswordToken = async function(id, token) {
//         client.connect().then(() => {
//             client.setEx(id + 'password', 3600, token + '').then(() => {
//                 client.disconnect();
//             });
//         });
//     };
// }


module.exports = {
    getVerifyToken,
    getPasswordToken,
    delVerifyToken,
    delPasswordToken,
    setVerifyToken,
    setPasswordToken,
};

