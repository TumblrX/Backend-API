const mongoose = require('mongoose');

const noteBlockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: ['comment', 'like', 'reblog'],
            message: '{VALUE} is not a note',
        },
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
},
{discriminatorKey: 'type'});

const noteSchema = new mongoose.Schema({
    notes: [noteBlockSchema],
    posts: {
        type: [mongoose.Types.ObjectId],
        ref: 'Post',
    },
});

noteSchema.post('findOneAndUpdate', async function(doc) {
    const notes = doc.notes;
    const likesCount = notes.filter((note) => note.type === 'like').length;
    const commentsCount = notes.filter((note) => note.type === 'comment').length;
    const reblogsCount = notes.filter((note) => note.type === 'reblog').length;
    const Post=require('./Post').postModel;
    await Post.updateMany({
        notes: doc,
    }, {
        likesCount, reblogsCount, commentsCount,
    });
});
const noteBlock = noteSchema.path('notes');

noteBlock.discriminator('like', new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
}));
noteBlock.discriminator('comment', new mongoose.Schema({
    commentText: {
        type: String,
        required: true,
    },
}));

noteBlock.discriminator('reblog', new mongoose.Schema({
    // Parent Post Id
    rebloggedPostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    // child Post Id
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {_id: false}), {_id: false});


module.exports = mongoose.model('Note', noteSchema);
/**
 * @swagger
 *  components:
 *      NoteBase:
 *          type: object
 *          required:
 *              - type
 *          properties:
 *              id:
 *                  type: string
 *              createdAt:
 *                  type: integer
 *              blogName:
 *                  type: string
 *              blogId:
 *                  type: string
 *              avatarShape:
 *                  type: string
 *                  enum:
 *                      - square
 *                      - circle
 *      reblogNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: reblog
 *                  postId:
 *                      type: string
 *                      description: id of the reblogged post
 *      commentNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: comment
 *                  commentText:
 *                      type: string
 *                      description: content of the comment
 *                  id:
 *                      type: string
 *                      description: id of the comment
 *      likeNote:
 *          allOf:
 *              - $ref: '#/components/NoteBase'
 *              - type: object
 *                properties:
 *                  type:
 *                      type: string
 *                      description: like
 *      Note:
 *          oneOf:
 *              - $ref: '#/components/reblogNote'
 *              - $ref: '#/components/commentNote'
 *              - $ref: '#/components/likeNote'
 */
