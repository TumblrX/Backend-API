const {validateComment, canDelete, filterNotes} = require('../../controllers/postFunctions/notesController');
const ObjectId = require('mongoose').Types.ObjectId;
describe('validateComment', () => {
    it('should return false when comment was not given', () => {
        const res = validateComment(undefined);
        expect(res).toBeFalsy();
    });

    it('should return false when comment is empty', () => {
        const res = validateComment('');
        expect(res).toBeFalsy();
    });
});

describe('canDelete', () => {
    it('should throw error when comment is not found', () => {
        expect(() => canDelete(undefined, 'id')).toThrowError(/not found/);
    });

    it('should throw error when note is not a comment', () => {
        expect(() => canDelete({
            type: 'like',
            blogId: ObjectId('61b4fd716a76650b89b76b82'),
        }, 'id')).toThrowError(/bad request/);
    });

    it('should throw error when this blog can\'t delete this note', () => {
        expect(() => canDelete({
            type: 'comment', blogId:
                ObjectId('61b4fd716a76650b89b76b82'),
        }, 'id')).toThrowError(/UnAuthorized/);
    });

    it('should return true when a comment can be deleted', () => {
        const res = canDelete({
            type: 'comment',
            blogId: ObjectId('61b4fd716a76650b89b76b82'),
        }, '61b4fd716a76650b89b76b82');
        expect(res).toBeTruthy();
    });
});

describe('filterNotes', () => {
    it('should remove all notes which is not with type {mode}', () => {
        let notes=[
            {type: 'like'},
            {type: 'like'},
            {type: 'like'},
            {type: 'comment'},
            {type: 'like'},
            {type: 'like'},
            {type: 'like'},
        ];
        notes = filterNotes(notes, 'comment');
        expect(notes.length).toBe(1);
        expect(notes[0].type).toBe('comment');
    });

    it('should remove all notes which is after {before}', () => {
        let notes=[
            {type: 'like', createdAt: 5},
            {type: 'like', createdAt: 7},
            {type: 'like', createdAt: 7},
            {type: 'like', createdAt: 7},
            {type: 'like', createdAt: 8},
        ];
        notes = filterNotes(notes, 'like', 6);
        expect(notes.length).toBe(1);
        expect(notes[0].createdAt).toBe(5);
    });
});
