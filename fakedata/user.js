const faker = require('faker');
const User = require('../models/User');
const {catchAsync} = require('../controllers/errorHandler');

const fakedata = catchAsync(async (req, res, next) => {
    // Validation
    // Check if email already exists
    for (let i =0; i<500; i++) {
        let name ='';
        let email ='';
        for (let i = 0; i < 1000; i++) {
            name = faker.name.firstName();
            const user = await User.findOne({username: name});
            if (!user) {
                if (name.length >=3 ) {
                    i=1000;
                }
            } else {
                console.log(name);
            }
        }
        for (let i = 0; i < 1000; i++) {
            email = faker.internet.email();
            const user = await User.findOne({email: email});
            if (! user) {
                i=1000;
            } else {
                console.log(email);
            }
        }
        const fakee = new User({
            username: name,
            email: email,
            password: faker.internet.password(),
        });
        await fakee.save();
    }
    res.status(200).json({
        'status': 'success',
    });
});

module.exports = {fakedata};
