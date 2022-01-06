const crudFunctions = require('../../controllers/blogFunctions/crudFuntions');

describe('createBlog', () => {
    it('should return "true" when the blog is private but to password is sent', async () => {
        body = {
            title: 'bishoy123',
            handle: 'bishoy458',
            private: true,
            password: '',
        };
        expect(await crudFunctions.checkCreate(body)).toBe('true');
    });

    it('should return "none" when the blog is not private', async () => {
        body = {
            title: 'bishoy123',
            handle: 'bishoy458',
            private: false,
            password: '',
        };
        expect(await crudFunctions.checkCreate(body)).toBe('none');
    });

    it('should return "true" when the blog is private and password is sent but some data is invalid ', async () => {
        body = {
            title: 'bishoy123',
            handle: 'bishoy458',
            private: true,
            password: '123',
        };
        expect(await crudFunctions.checkCreate(body)).toBe('true');
    });

    it('should return hashed password when the blog is private and password is sent', async () => {
        body = {
            title: 'bishoy123',
            handle: 'bishoy458',
            private: true,
            password: '123234567',
        };
        expect(await crudFunctions.checkCreate(body)).toBeDefined();
    });
});
