const isColor= require('../../controllers/validation').isColor.validator;

describe('isColor', () => {
    it('should reject more than 7 chars', () => {
        const result=isColor('#fffffff');
        expect(result).toBe(false);
    });
    it('should reject less than 7 chars', () => {
        const result=isColor('#fffff');
        expect(result).toBe(false);
    });
    it('should reject non hex colors', () => {
        const result=isColor('#geffff');
        expect(result).toBe(false);
    });
    it('should accept  hex colors', () => {
        const result=isColor('#000000');
        expect(result).toBe(true);
        const result2=isColor('#ffffff');
        expect(result2).toBe(true);
    });
});
