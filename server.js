const mongoose = require('mongoose');
const dotenv = require('dotenv');
const randomString = require('./controllers/utils/RandomString');

if (!(process.env.SERVER==='true')) {
    dotenv.config({
        path: './config.env',
    });
}
process.env.TOKEN_SECRET = randomString(40);
const app = require('./app');
const dbPass = process.env.MONGODB_PASS;
const dbURL = process.env.MONGODB_URL.replace('<password>', dbPass);
const PORT = process.env.PORT || 3000;

mongoose.connect(dbURL, (err) => {
    if (err) {
        console.error('Couldn\'t Connect to Database 😢');
    } else {
        console.log('Connected to Database');
        app.listen(PORT, () => console.log(`Server started on Port ${PORT} 😎`));
    }
});

