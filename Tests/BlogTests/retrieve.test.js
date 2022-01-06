const crudFunctions = require('../../controllers/blogFunctions/crudFuntions');

describe('checkPrivate', () => {
    it('should return true if blog is public', () => {
        expect(crudFunctions.checkPrivate(false)).toBe(true);
    });

    it('should return false if blog is private', () => {
        expect(crudFunctions.checkPrivate(true)).toBe(false);
    });
});
