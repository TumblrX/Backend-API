require('../../controllers/errorHandler').catchAsync = jest.fn((a) => a);
const postFunctions = require('../../controllers/postFunctions/functions');
const postCrudFunctions = require('../../controllers/postFunctions/crud');
const Post = require('../../models/Post').postModel;
const User = require('../../models/User');
const {reblogNotification} = require('../../models/Notification');


const mockResponse = () => {
    const res = {
        headersSent: false,
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue({...res, headersSent: true});
    return res;
};
describe('ensureSafeCreation', () => {
    it('should remove all protected attributes if present in the request', () => {
        const post = {
            'publishedOn': '15-8-2020',
            'notes': '545asdasd6w2',
            'trail': [],
            'reblogsCount': 500,
            'likesCount': 501,
            'commentsCount': 500,
            'blogAttribution': '545asdasd6w2',
            'submittedBy': '545asdasd6w2',
            '_id': '545asdasd6w2',
            'createdAt': '15-8-2020',
            'updatedAt': '15-8-2020',
        };
        const result = postFunctions.ensureSafeCreation(post);
        expect(Object.keys(result)).toEqual([]);
    });
    it('should not remove unprotected attributes if present in the request', () => {
        const post = {
            'publishedOn': '15-8-2020',
            'notes': '545asdasd6w2',
            'trail': [],
            'reblogsCount': 500,
            'likesCount': 501,
            'commentsCount': 500,
            'blogAttribution': '545asdasd6w2',
            'submittedBy': '545asdasd6w2',
            '_id': '545asdasd6w2',
            'createdAt': '15-8-2020',
            'updatedAt': '15-8-2020',
            'content': [{type: 'text', text: 'text block'}],
        };
        const result = postFunctions.ensureSafeCreation(post);
        expect(Object.keys(result)).toContain('content');
    });
});

describe('addIsLikedToPosts', () => {
    it('should add boolean to the posts', () => {
        const posts = [Post({}), Post({})];
        const result = postCrudFunctions.addIsLikedToPosts(posts);
        for (const post of result) {
            expect(Object.keys(post)).toContain('liked');
        }
    });
    it('should add false to the posts if user wasn\'t provided ', () => {
        const posts = [Post({}), Post({})];
        const result = postCrudFunctions.addIsLikedToPosts(posts);
        for (const post of result) {
            expect(Object.keys(post)).toContain('liked');
            expect(post.liked).toBeFalsy();
        }
    });

    it('should add true to the posts if user liked that post', () => {
        const posts = [Post({}), Post({})];
        const user = User({
            likedPosts: [
                posts[0]._id, posts[1]._id,
            ],
        });

        const result = postCrudFunctions.addIsLikedToPosts(posts, user);
        for (const post of result) {
            expect(post.liked).toBeTruthy();
        }
    });

    it('should add true to the posts if user liked parent of that post', () => {
        const parentPost = Post({});
        const posts = [
            Post({trail: [parentPost._id]}),
            Post({}),
            Post({trail: [parentPost._id]}),
        ];

        const user = User({
            likedPosts: [parentPost],
        });

        const result = postCrudFunctions.addIsLikedToPosts(posts, user);
        expect(result[0].liked).toBeTruthy();
        expect(result[1].liked).toBeFalsy();
        expect(result[2].liked).toBeTruthy();
    });
});

describe('handleUploadedMedia', () => {
    test('should add url to each media content block', async () => {
        const req = {
            files: [
                {
                    fieldname: '123',
                    filename: 'file123',
                    mimetype: 'image/jpeg',
                },
                {
                    fieldname: '111',
                    filename: 'file111',
                    mimetype: 'video/mp4',
                },
            ],
            body: {
                content: [
                    {
                        identifier: '123',
                    },
                    {
                        identifier: '111',
                    },
                    {
                        text: 'text',
                    },
                ],
            },
        };
        expect.assertions(4);
        const next = jest.fn();
        await postCrudFunctions.handleUploadedMedia(req, null, next);
        expect(next).toHaveBeenCalled();
        expect(req.body.content[0].url).toEqual('uploads/post/image/file123');
        expect(req.body.content[1].url).toEqual('uploads/post/video/file111');
        expect(req.body.content[2].url).toEqual(undefined);
    });
});

describe('protectAttributes', () => {
    it('should call ensureSafeCreation', () => {
        const next = jest.fn();
        postFunctions.ensureSafeCreation = jest.fn();
        const mockReq = {
            body: {
                someKey: 'value',
            },
        };
        postCrudFunctions.protectAttributes(mockReq, null, next);
        expect(postFunctions.ensureSafeCreation).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});

describe('reblog', () => {
    const mockRequest = (body, blogId) => {
        const req = {
            body: body || {
                reblogData: {
                    parentPostId: 'id',
                },
            },
            params: {
                blogid: blogId || 'id',
            },
        };
        return req;
    };

    test(' it should call next when this request is not a reblog', async () => {
        Post.prototype.validate = jest.fn();
        Post.prototype.save = jest.fn().mockReturnValue(Post({}));
        reblogNotification.prototype.save = jest.fn().mockReturnValue(reblogNotification({}));
        Post.findOne = jest.fn().mockReturnValue(Post({}));
        const next = jest.fn();
        const mockReq = mockRequest({});
        const res = mockResponse();
        await postCrudFunctions.reblog(mockReq, res, next);
        expect(next).toHaveBeenCalled();
    });
    test('should not call next when this request is  a reblog', async () => {
        Post.prototype.validate = jest.fn();
        Post.prototype.save = jest.fn().mockReturnValue(Post({}));
        reblogNotification.prototype.save = jest.fn().mockReturnValue(reblogNotification({}));
        Post.findOne = jest.fn().mockReturnValue({blogAttribution: {owner: 'a'}, trail: []});
        const next = jest.fn();
        const mockReq = mockRequest();
        const res = mockResponse();
        await postCrudFunctions.reblog(mockReq, res, next);
        expect(next).not.toHaveBeenCalled();
    });
    test('should not notify the user when a post is reblogged', async () => {
        Post.prototype.validate = jest.fn();
        Post.prototype.save = jest.fn().mockReturnValue(Post({}));
        reblogNotification.prototype.save = jest.fn().mockReturnValue(reblogNotification({}));
        Post.findOne = jest.fn().mockReturnValue({blogAttribution: {owner: 'a'}, trail: []});
        const next = jest.fn();
        const mockReq = mockRequest();
        const res = mockResponse();
        await postCrudFunctions.reblog(mockReq, res, next);
        expect(reblogNotification.prototype.save).toHaveBeenCalled();
    });
    test('it should call next when post not found', async () => {
        const req = mockRequest();
        Post.prototype.validate = jest.fn();
        Post.prototype.save = jest.fn().mockReturnValue(Post({}));
        reblogNotification.prototype.save = jest.fn().mockReturnValue(reblogNotification({}));
        Post.findOne = jest.fn();
        const res = mockResponse();
        const next = jest.fn();

        await postCrudFunctions.reblog(req, res, next);

        expect(Post.findOne).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
});

describe('create', () => {
    test('it should not accept submission', async () => {
        const req = {
            body: {
                state: 'submission',
            },
        };
        Post.prototype.save = jest.fn();
        try {
            await postCrudFunctions.create(req);
        } catch (e) {
            expect(Post.prototype.save).not.toHaveBeenCalled();
            expect(e.statusCode >= 400).toBeTruthy();
        }
    });
    test('it should call save', async () => {
        const req = {body: {}};
        Post.prototype.save = jest.fn();
        const res = mockResponse();
        await postCrudFunctions.create(req, res);
        expect(Post.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });
});

describe('update', () => {
    const mockRequest = (body, userBlogs, postid) => {
        return {
            body: body || {
                state: 'published',
            },
            params: {
                postid: postid || 'id',
            },
            user: {
                getAllBlogs: () => userBlogs || [],
            },
        };
    };
    test('it should not change state if it is published', async () => {
        const req = mockRequest({state: 'private'});
        Post.findOneAndUpdate = jest.fn().mockReturnValue(Post({}));
        const res = mockResponse();
        const next = jest.fn();
        await postCrudFunctions.update(req, res, next);
        expect(Post.findOneAndUpdate).toHaveBeenCalled();
        expect(req.body).toMatchObject({});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(next).not.toHaveBeenCalled();
    });
    test('it should call next when post not found', async () => {
        const req = mockRequest();
        Post.findOneAndUpdate = jest.fn().mockReturnValue(null);
        const res = mockResponse();
        const next = jest.fn();

        await postCrudFunctions.update(req, res, next);

        expect(Post.findOneAndUpdate).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0].statusCode).toBe(403);
    });
});
describe('delete', () => {
    const mockRequest = (id) => {
        return {
            body: {},
            params: {
                postid: id || '61c480e50d115cdd9bcee800',
            },
        };
    };
    test('should throw when id is wrong', async () => {
        try {
            await postCrudFunctions.delete(mockRequest('ww'));
        } catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
