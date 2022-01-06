const {createSubmissionPost} = require('../../controllers/postFunctions/submissions');

describe('createSubmissionPost', () => {
    it('should have a state = submission', () => {
        const post = createSubmissionPost({}, 'id', {});
        expect(post.state).toBe('submission');
    });

    it('should be submitted by the user primary blog', () => {
        let primaryBlog = 'primaryBlogId';
        let post = createSubmissionPost({}, 'id', {primaryBlog});
        expect(post.submittedBy).toBe(primaryBlog);

        primaryBlog = 'primaryBlogId2';
        post = createSubmissionPost({}, 'id', {primaryBlog});
        expect(post.submittedBy).toBe(primaryBlog);
    });

    it('should be in blog  with id blogId', () => {
        let blogId = 'blogId';
        let post = createSubmissionPost({}, blogId, {});
        expect(post.blogAttribution).toBe(blogId);

        blogId = 'blogId2';
        post = createSubmissionPost({}, blogId, {});
        expect(post.blogAttribution).toBe(blogId);
    });
});
