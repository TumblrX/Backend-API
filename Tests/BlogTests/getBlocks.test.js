const search = require('../../controllers/routers/blogRoutes/getBlocks');

describe('belong', () => {
    it('should return false if blog deos not belong to that user', () => {
        index = -1;
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619512f9fa9b15ff98feedd0';
        expect(search.belong(index, primaryBlog, blogId)).toBe(false);
    });

    it('should return true if blog belongs to that user', () => {
        index = 2;
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619511fbfa9b15ff98feedc8';
        expect(search.belong(index, primaryBlog, blogId)).toBe(true);
    });

    it('should return true if blog is the user\'s primary blog', () => {
        index = -1;
        primaryBlog = '619511d1fa9b15ff98feedc3';
        blogId = '619511d1fa9b15ff98feedc3';
        expect(search.belong(index, primaryBlog, blogId)).toBe(true);
    });
});


describe('retrievedata', () => {
    it('should be empty', () => {
        blogs = {blockedTumblrs: []};
        expect(search.retreiveDate(blogs)).toStrictEqual([]);
    });
});
