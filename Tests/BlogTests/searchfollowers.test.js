const search = require('../../controllers/routers/blogRoutes/searchFollowers');

describe('iaAfollower', () => {
    it('should return false when you are not a follower', async () => {
        blog = {followedBy: '61951411465594436e3d9e85'};
        follower = '6195137677a99acdf1576361';
        expect(await search.isAFollower(follower, blog)).toBe(false);
    });

    it('should return true when the you are a follower', async () => {
        blog = {followedBy: '61951411465594436e3d9e85'};
        follower = '61951411465594436e3d9e85';
        expect(await search.isAFollower(follower, blog)).toBe(true);
    });
});


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
