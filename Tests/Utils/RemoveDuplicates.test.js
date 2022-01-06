const removeDuplicates = require('../../controllers/utils/removeDuplicates');

describe('removeDuplicates', () => {
    it('should remove all duplicated values', () => {
        let arr = [1, 1, 1];
        arr=removeDuplicates(arr);
        expect(arr.length).toBe(1);
    });
    it('should keep one of the duplicated values', () => {
        let arr = [1, 1, 1];
        arr=removeDuplicates(arr);
        expect(arr).toContain(1);
    });
    it('should not remove unique values', () => {
        const arr = [1, 2, 3];
        const arr2=removeDuplicates(arr);
        expect(arr2).toEqual(arr);
    });
});
