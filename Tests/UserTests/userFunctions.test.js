const userFunctions = require('../../controllers/userFuncitons/userFunctions');
const User = require('../../models/User');
const Blog = require('../../models/Blogs').BlogModel;
const bcrypt = require('bcrypt');

describe('userExists', () => {
    const usersArray = [{
        username: 'test',
        email: 'example@mail.com',
        _id: '34873259873',
    }, {
        username: 'john',
        email: 'john@mail.com',
        _id: '34873239873',
    }];
    User.findOne = async function(object) {
        for (let i = 0; i < usersArray.length; i++) {
            const user = usersArray[i];
            if (user.email == object['$or'][0]['email']) {
                return user;
            }
            if (user.username == object['$or'][1]['username']) {
                return user;
            }
        }
        return null;
    };
    it('should find user', () => {
        const user = User({
            username: 'example',
            email: 'example@mail.com',
            password: 'example',
        });
        return expect(userFunctions.userExists(user)).resolves.toBe('34873259873');
    });
    it('should not find user', () => {
        const user = User({
            username: 'anotherExample',
            email: 'anotherExample@mail.com',
            password: 'anotherExample',
        });
        return expect(userFunctions.userExists(user)).resolves.toBe(null);
    });
    it('should find user', () => {
        const user = User({
            username: 'john',
            email: 'john33@mail.com',
            password: 'password',
        });
        return expect(userFunctions.userExists(user)).resolves.toBe('34873239873');
    });
});

describe('primaryBlogExists', () => {
    const blogsArray = ['john'];
    Blog.findOne = async function(object) {
        return blogsArray.includes(object['$or'][0]['handle']);
    };
    it('should find primary blog', () => {
        const blog = Blog({
            handle: 'john',
        });
        return expect(userFunctions.primaryBlogExists(blog)).resolves.toBe(true);
    });
    it('should not find primary blog', () => {
        const blog = Blog({
            handle: 'peter',
        });
        return expect(userFunctions.primaryBlogExists(blog)).resolves.toBe(false);
    });
});

describe('canCreateUser', () => {
    const usersArray = [{
        username: 'test',
        email: 'example@mail.com',
        _id: '34873259873',
    }, {
        username: 'john',
        email: 'john@mail.com',
        _id: '34873239873',
    }];
    User.findOne = async function(object) {
        for (let i = 0; i < usersArray.length; i++) {
            const user = usersArray[i];
            if (user.email == object['$or'][0]['email']) {
                return user;
            }
            if (user.username == object['$or'][1]['username']) {
                return user;
            }
        }
        return null;
    };
    const blogsArray = ['john', 'jack'];
    Blog.findOne = async function(object) {
        return blogsArray.includes(object['$or'][0]['handle']);
    };
    it('can\'t create user', () => {
        const user = User({
            username: 'example',
            email: 'example@mail.com',
            password: 'example',
        });
        return expect(userFunctions.canCreateUser(user)).resolves.toBe(false);
    });

    it('can\'t create user', () => {
        const user = User({
            username: 'jack',
            email: 'jack@mail.com',
            password: 'jack',
        });
        return expect(userFunctions.canCreateUser(user)).resolves.toBe(false);
    });
    it('can create user', () => {
        const user = User({
            username: 'peter',
            email: 'peter@mail.com',
            password: 'peter',
        });
        return expect(userFunctions.canCreateUser(user)).resolves.toBe(true);
    });
});

describe('setNewPassword', () => {
    const MockData = {
        'example@gmail.com':
            {'password': 'oldPassword'},
    };
    User.findOneAndUpdate = async (query, data) => {
        if (MockData[query['email']]) {
            MockData[query['email']].password = data['password'];
        } else {
            throw new Error('User Not Found');
        }
    };
    bcrypt.hash = async (password, number) => password;
    it('User Not Found Error', () => {
        return expect(userFunctions.setNewPassword('example@example.com', 'newPassword'))
            .rejects.toThrow(Error('User Not Found'));
    });
    it('Password Changed', () => {
        return expect((async () => {
            await userFunctions.setNewPassword('example@gmail.com', 'newPassword');
            return MockData['example@gmail.com'].password;
        })()).resolves.toBe('newPassword');
    });
});

describe('updateUserPassword', () => {
    const MockData = {
        '12345':
            {'password': 'oldPassword'},
    };
    User.updateOne = async (query, data) => {
        keys = Object.keys(data['$set']);
        if (MockData[query['_id']]) {
            MockData[query['_id']][keys[0]] = data['$set'][keys[0]];
            return {modifiedCount: 1};
        } else {
            throw new Error('User Not Found');
        }
    };
    bcrypt.hash = async (password, number) => password;
    it('User Not Found Error', () => {
        return expect(userFunctions.updateUserPassword('213', 'newPassword')).rejects.toThrow(Error('User Not Found'));
    });
    it('Password Changed', () => {
        return expect((async () => {
            await userFunctions.updateUserPassword('12345', 'newPassword');
            return MockData['12345'].password;
        })()).resolves.toBe('newPassword');
    });
});


describe('getTagsPhotosFromPostsWithTags', () => {
    const MockData = [{
        tags: ['coding'],
        content: [{type: 'image', url: 'codingURL'}],
    },
    {
        tags: ['math'],
        content: [{type: 'image', url: 'mathURL'}],
    }];
    const MockData2 = [{
        tags: ['coding'],
        content: [{type: 'text', url: 'codingURL'}],
    },
    {
        tags: ['math'],
        content: [{type: 'text', url: 'mathURL'}],
    }];
    it('get tags with URLs', () => {
        return expect(userFunctions.getTagsPhotosFromPostsWithTags(MockData)).resolves
            .toStrictEqual({'coding': ['codingURL'], 'math': ['mathURL']});
    });
    it('get empty object', () => {
        return expect(userFunctions.getTagsPhotosFromPostsWithTags(MockData2)).resolves
            .toStrictEqual({'coding': [], 'math': []});
    });
});


describe('addFriendsToBlogs', () => {
    const MockData = [{_id: '1234'}, {_id: '1324'}, {_id: '5678'}];
    const MockData2 = [{_id: '1324'}, {_id: '5678'}];
    User.aggregate = async (test) => {
        return [{primaryBlog: '1234'}, {primaryBlog: '5678'}];
    };
    it('add friends flag1', () => {
        return expect(userFunctions.addFriendsToBlogs({
            '_id': '1434',
            'primaryBlog': '2134',
            'blogs': ['415', '5235'],
        }, MockData)).resolves
            .toStrictEqual([{
                '_id': '1234',
                'friends': true,
            }, {
                '_id': '1324',
                'friends': false,
            }, {
                '_id': '5678',
                'friends': true,
            }]);
    });
    it('add friends flag2', () => {
        return expect(userFunctions.addFriendsToBlogs({
            '_id': '1434',
            'primaryBlog': '2134',
            'blogs': ['415', '5235'],
        }, MockData2)).resolves
            .toStrictEqual([{
                '_id': '1324',
                'friends': false,
            }, {
                '_id': '5678',
                'friends': true,
            }]);
    });
});


describe('addTagFlagToPost', () => {
    const MockData = [{tags: ['coding', 'c++']},
        {tags: ['coding', 'math']},
        {tags: ['python']}];
    it('add tag flag', () => {
        return expect(userFunctions.addTagFlagToPost(MockData, ['coding', 'math'])).toStrictEqual([
            {
                'tags': ['coding', 'c++',
                ],
                'youFollowTheseTags': [
                    'coding',
                ],
            },
            {
                'tags': [
                    'coding', 'math',
                ],
                'youFollowTheseTags': [
                    'coding', 'math',
                ],
            },
            {
                'tags': [
                    'python',
                ],
            }]);
    });
});


describe('addIsLikedToPostsJSON', () => {
    const MockData = [{_id: '2134', tags: ['coding', 'c++'], trail: []},
        {_id: '231', tags: ['coding', 'math'], trail: []},
        {_id: '1221', tags: ['python'], trail: []}];
    // eslint-disable-next-line no-extend-native
    String.prototype.equals = function(x) {
        return this.toString() == x;
    };
    it('add tag flag', () => {
        return expect(userFunctions.addIsLikedToPostsJSON(MockData, {
            'likedPosts': [
                '2134',
                '231',
            ],
        })).toStrictEqual([
            {
                '_id': '2134',
                'liked': true,
                'tags': [
                    'coding',
                    'c++',
                ],
                'trail': [],
            },
            {
                '_id': '231',
                'liked': true,
                'tags': [
                    'coding',
                    'math',
                ],
                'trail': [],
            },
            {
                '_id': '1221',
                'liked': false,
                'tags': [
                    'python',
                ],
                'trail': [],
            },
        ]);
    });
});

describe('saveSettings', () => {
    const MockData = {
        '12345':
        {
            'settings': {
                infinityScroll: true,
                hideEmail: false,
            },
        },
    };
    it('User Not Found Error', () => {
        return expect(userFunctions.saveSettings({
            infinityScroll: true,
            hideEmail: false,
        }, '213')).rejects.toThrow(Error('User Not Found'));
    });
    it('Settings Changed', () => {
        return expect(userFunctions.saveSettings({
            infinityScroll: true,
            hideEmail: false,
        }, '12345')).resolves.toBe(1);
    });
});
