const faker = require('faker');
const {BlogModel} = require('../models/Blogs');
const {catchAsync} = require('../controllers/errorHandler');
const User = require('../models/User');

const fakedata = catchAsync(async (req, res, next) => {
    // Validation
    // Check if email already exists
    const users = await User.find();
    const ids = users.map((user)=>user._id);
    // console.log(ids);
    for (let i =0; i<300; i++) {
        const txt = ids[Math.floor(Math.random()*ids.length)];
        const numb = String(txt).replace( /(^.*\[|\].*$)/g, '' );
        let name ='';
        let title ='';
        for (let i = 0; i < 1000; i++) {
            name = faker.name.lastName();
            const blog = await BlogModel.findOne({handle: name});
            if (!blog) {
                if (name.length >= 3) {
                    i=1001;
                }
            } else {
                console.log(name);
            }
        }
        for (let i = 0; i < 1000; i++) {
            title = faker.name.firstName();
            if (title.length >= 3) {
                i=1001;
            }
        }
        const fakee = new BlogModel({
            title: faker.name.firstName(),
            handle: name,
            password: faker.internet.password(),
            description: faker.lorem.sentence(20),
            owner: String(numb),
        });
        await fakee.save();
        const user = await User.findOne({_id: String(numb)});
        const blog = await BlogModel.findOne({handle: name});
        user.blogs.push(blog._id);
        await user.save();
    }
    res.status(200).json({
        'status': 'success',
    });
});


module.exports = {fakedata};
