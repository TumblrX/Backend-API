// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const User = require('./User');


//* Using migrate-mongo
module.exports = {
    async up(db, client) {
        const cursor = await db.collection('User').find();

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const version = 1;

            await db.collection('User').updateOne({_id: doc._id}, {$set: {version: version}});
        }
    },

    async down(db, client) {
        await db.collection('User').updateMany({}, {$unset: {version: true}});
    },
};

module.exports = {
    async up(db, client) {
        const cursor = await db.collection('User').find();

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const isEmailVerified = false;

            await db.collection('User').updateOne({_id: doc._id}, {$set: {isEmailVerified: isEmailVerified}});
        }
    },

    async down(db, client) {
        await db.collection('User').updateMany({}, {$unset: {isEmailVerified: true}});
    },
};


module.exports = {
    async up(db, client) {
        const cursor = await db.collection('User').find();

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const nickname = doc.email.split('@')[0];

            await db.collection('User').updateOne({_id: doc._id}, {$set: {nickname: nickname}});
        }
    },

    async down(db, client) {
        await db.collection('User').updateMany({}, {$unset: {nickname: true}});
    },
};

module.exports = {
    async up(db, client) {
        const cursor = await db.collection('User').find();

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            const family = doc.username.split(' ')[1];

            await db.collection('User').updateOne({_id: doc._id}, {$set: {family: family}});
        }
    },

    async down(db, client) {
        await db.collection('User').updateMany({}, {$unset: {family: true}});
    },
};
