const crudFunctions = require('../../controllers/blogFunctions/crudFuntions');

describe('validRequest', () => {
    it('should return true for valid request', () => {
        body = {data: '{\n"title" : "AAAAAAAAAAAa"\n}'};
        files = [{
            fieldname: 'avatar',
            originalname: 'ex2.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'views\\uploads\\blog',
            filename: '1637182770268.jpg',
            path: 'views\\uploads\\blog\\1637182770268.jpg',
            size: 179919,
        }];
        const result = crudFunctions.validRequest(body, files);
        expect(result).toBe(true);
    });

    it('should return false for request which has empty data attribute and empty files', () => {
        body = {data: ''};
        files = [];
        expect(crudFunctions.validRequest(body, files)).toBe(false);
    });

    it('should return false for undefined files and empty body ', () => {
        body = {};
        files = undefined;
        expect(crudFunctions.validRequest(body, files)).toBe(false);
    });
});

describe('belong', () => {
    it('should return false if blog deos not belong to that user', () => {
        blogs = ['619511fbfa9b15ff98feedc8', '61951263fa9b15ff98feedcc'];
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619512f9fa9b15ff98feedd0';
        expect(crudFunctions.belong(blogs, primaryBlog, blogId)).toBe(false);
    });

    it('should return true if blog belongs to that user', () => {
        blogs = ['619511fbfa9b15ff98feedc8', '61951263fa9b15ff98feedcc'];
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619511fbfa9b15ff98feedc8';
        expect(crudFunctions.belong(blogs, primaryBlog, blogId)).toBe(true);
    });

    it('should return true if blog is the user\'s primary blog', () => {
        blogs = ['619511fbfa9b15ff98feedc8', '61951263fa9b15ff98feedcc'];
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619511d1fa9b15ff98feedc3';
        expect(crudFunctions.belong(blogs, primaryBlog, blogId)).toBe(true);
    });
});

describe('isJSON', () => {
    it('should return true if the passes parameter can be converted to json format', () => {
        str = '{"title": "hello"}';
        expect(crudFunctions.isJSON(str)).toBe(true);
    });

    it('should return false if the passes parameter can not be converted to json format', () => {
        str = 'any string';
        expect(crudFunctions.isJSON(str)).toBe(false);
    });
});

describe('checkData', () => {
    it('should return false if no request body in of type NaN is sent', async () => {
        body = NaN;
        blog = {};
        expect(await crudFunctions.checkData(body, blog)).toBe('bad request');
    });
});
