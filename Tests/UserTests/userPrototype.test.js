const User = require('../../models/User');

describe('canWriteToBlog', () => {
    it('should allow writing to primary blog', () => {
        const user = User({'primaryBlog': '61958b7b10f83d7972fdd359'});
        const result = user.canWriteToBlog('61958b7b10f83d7972fdd359');
        expect(result).toBe(true);
    });

    it('should allow writing to secondary blogs', () => {
        const user = User({
            primaryBlog: '61958b7b10f83d7972fddddd',
            blogs: ['61958b7b10f83d7972fdd359', '61958b7b10f83d7972fdd457'],
        });
        let result = user.canWriteToBlog('61958b7b10f83d7972fdd359');
        expect(result).toBe(true);
        result = user.canWriteToBlog('61958b7b10f83d7972fdd457');
    });

    it('should prevent user from writing to a blog he doesn\'t belong to him', () => {
        const user = User({
            primaryBlog: '61958b7b10f83d7972fdd359',
            blogs: ['61958b7b10f83d7972fdd359', '61958b7b10f83d7972fdd457'],
        });
        const result = user.canWriteToBlog('61958b7b10f83d7972fdd666');
        expect(result).toBe(false);
    });
});
