const mongoose = require('mongoose');
const AppError = require('../controllers/utils/appError');
const removeDuplicates = require('../controllers/utils/removeDuplicates');
const Schema = mongoose.Schema;
const Blog = require('./Blogs').BlogModel;
const {isColor} = require('../controllers/validation');
const SERVER_URL = 'http://tumblrx.me:3000/';

const blogAttributionSchema = {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
};

const inTextRange = {
    validator: function(v) {
        const textLength = this.parent().text.length;
        if (v < 0 || v >= textLength) {
            return false;
        }
        return true;
    },
    message: '{VALUE} is not in range',
};

const textFormatSchema = new Schema({
    start: {
        type: Number,
        required: [true, 'start is required'],
        validate: inTextRange,
    },
    end: {
        type: Number,
        required: [true, 'end is required'],
        validate: [inTextRange, {
            validator: function(v) {
                return v > this.start;
            },
            message: 'end must be > start',
        }],
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ['bold', 'italic', 'strikethrough', 'small',
                'link', 'mention', 'color'],
            message: '{VALUE} is not supported format type',
        },
    },
}, {
    discriminatorKey: 'type',
    _id: false,
});


const linkFormatSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
}, {
    _id: false,

});
const mentionFormatSchema = new Schema({
    uuid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog',
    },
    name: String,
    url: String,
}, {
    _id: false,

});

const colorFormatSchema = new Schema({
    hex: {
        type: String,
        required: [true, 'color in hex is required'],
        validate: isColor,
    },
}, {
    _id: false,

});

const textBlockSchema = new Schema({
    text: {
        type: String,
        required: [true, 'text is required'],
    },
    subtype: {
        type: String,
        enum: {
            values: ['heading1',
                'heading2',
                'quirky',
                'quote',
                'indented',
                'chat',
                'ordered-list-item',
                'unordered-list-item'],
            message: '{VALUE} is not a supported text type',
        },
    },
    indentLevel: {
        type: Number,
        min: 0,
        max: 7,
    },
    formatting: [textFormatSchema],
}, {_id: false});
textBlockSchema.path('formatting').discriminator('link', linkFormatSchema, {_id: false});
textBlockSchema.path('formatting').discriminator('mention', mentionFormatSchema, {_id: false});
textBlockSchema.path('formatting').discriminator('color', colorFormatSchema, {_id: false});
const url = {
    type: String,
    get: (v) => v.startsWith('uploads/') ? SERVER_URL + v : v,
    required: true,
};
const imageBlockSchema = new Schema({
    media: {
        type: String,
        validate: {
            validator: (v) => v.startsWith('image/'),
            message: '{VALUE} is invalid image type',
        },
    },
    url,
    width: {
        type: Number,
        min: 0,
    },
    height: {
        type: Number,
        min: 0,
    },
    altText: {
        type: String,
        trim: true,
    },
    caption: {
        type: String,
        trim: true,
    },
}, {
    _id: false,
    toJSON: {getters: true},
});

const videoBlockSchema = new Schema({
    media: {
        type: String,
        validate: {
            validator: (v) => v.startsWith('video/'),
            message: '{VALUE} is invalid video type',
        },
    },
    url,
    provider: {
        type: String,
        enum: {
            values: ['tumblrx', 'youtube', 'vimeo'],
            message: '{VALUE} is not a trusted provider',
        },
        default: 'tumblrx',
    },
    title: String,
    artist: String,
    album: String,
    poster: imageBlockSchema,
}, {
    _id: false,
    toJSON: {
        getters: true,
    },
});

const audioBlockSchema = new Schema({
    media: {
        type: String,
        validate: {
            validator: (v) => v.startsWith('audio/'),
            message: '{VALUE} is invalid audio type',
        },
    },
    url,
    provider: {
        type: String,
        enum: {
            values: ['tumblrx', 'soundcloud', 'spotify'],
            message: '{VALUE} is not trusted provider',
        },
        default: 'tumblrx',
    },
    title: String,
    artist: String,
    album: String,
    poster: imageBlockSchema,
}, {
    _id: false,
    toJSON: {
        getters: true,
    },
});

const linkBlockSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    description: String,
    author: String,
    poster: imageBlockSchema,

}, {
    _id: false,

});
const blocks = {
    type: [Number],
    required: true,
    validate: [
        {
            validator: (v) => v.length > 0,
            message: 'blocks can\'t be empty',
        },
        {
            validator: function(v) {
                for (const i of v) {
                    const contentLength = this.parent().parent().content.length;
                    if (i >= contentLength || i < 0) {
                        return false;
                    }
                }
                return true;
            },
            message: '{VALUE} is invalid block number',
        },
    ],
};


const blockSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: ['text', 'video', 'image', 'audio', 'link'],
            message: '{VALUE} is not a valid content block type',
        },
    },
}, {
    discriminatorKey: 'type',
    _id: false,
});

const rowLayoutSchema = new Schema({
    // TODO what if not all of them are provided
    display: [{
        blocks: blocks,
        mode: {
            type: String,
            enum: {
                values: ['carousel', 'weighted'],
            },
            default: 'weighted',
        },
    }],
    truncateAfter: {
        type: Number,
        min: -1,
        validate: {
            message: '{VALUE} is invalid truncateAfter value',
            validator: function(v) {
                if (!this.display && v < this.parent().content.length) {
                    return true;
                }
                for (const displayBlock of this.display) {
                    const blocks = displayBlock.blocks;
                    if (v === blocks[blocks.length - 1]) {
                        return true;
                    }
                }
                return false;
            },
        },
    },
}, {
    _id: false,
});

const askLayoutSchema = new Schema({
    questionBlocks: blocks,
    attribution: blogAttributionSchema,
}, {
    _id: false,

});

const postSchema = new Schema({
    // the blog who submitted this post
    submittedBy: blogAttributionSchema,
    // ID of the blog this post belongs to
    blogAttribution: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
        index: 1,
    },
    // // ID of the user who authored this post
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    // },
    content: {
        type: [blockSchema],
    },
    // of the post, can be one of the following type
    // text, quote, link, answer, video, audio, photo, chat
    postType: {
        type: String,
        default: 'text',
        enum: {
            values: ['text', 'ask', 'quote', 'link', 'answer', 'video', 'audio', 'photo'],
            message: 'invalid postType',
        },
    },
    state: {
        type: String,
        default: 'published',
        enum: {
            values: ['published', 'draft', 'submission', 'private'],
            message: 'invalid state',
        },
    },
    // Title of this blog post
    title: String,

    // slug: {
    //     type: String,
    //     unique: true,
    // },
    rowLayout: rowLayoutSchema,
    askLayout: askLayoutSchema,
    commentsCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    // numbr of likes for this post
    likesCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    // number of shares for this post
    reblogsCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    // The parent post ID, if the post being fetched is a reblog
    trail: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
    },
    tags: {
        type: [String],
        set: removeDuplicates,
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
    },
    publishedOn: {
        type: Number,
    },
},
{
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
},
);
// Content block types
const content = postSchema.path('content');
content.discriminator('text', textBlockSchema, {_id: false});
content.discriminator('image', imageBlockSchema, {_id: false});
content.discriminator('video', videoBlockSchema, {_id: false});
content.discriminator('audio', audioBlockSchema, {_id: false});
content.discriminator('link', linkBlockSchema, {_id: false});


postSchema.virtual('notesCount').get(function() {
    return this.commentsCount + this.likesCount + this.reblogsCount;
});

postSchema.virtual('isReblogged').get(function() {
    if (this.trail) {
        return this.trail.length > 0;
    }
});

const Notes = require('./Notes');
// after you create a post you need to create a notes object for it
// only if it wasn't assigned
postSchema.pre('save', async function(next) {
    if (this.trail.length > 0 || (this.content && this.content.length > 0)) {
        next();
    } else {
        next(new AppError('content can\'t be empty', 400));
    }
});

postSchema.pre('save', async function(next) {
    if (!this.notes) { // new Post
        this.notes = await Notes({posts: [this._id]}).save();
    }
    next();
});


postSchema.pre('save', async function(next) {
    if (this.state === 'published' || this.state === 'private') {
        this.publishedOn = Math.floor(Date.now() / 1000);
    }
    next();
});

postSchema.post('save', async function(doc) {
    if (doc.state === 'published') {
        await Blog.findByIdAndUpdate(doc.blogAttribution, {
            $addToSet: {
                posts: doc._id,
            },
        });
    };
});
postSchema.post('save', async function(doc) {
    if (doc.isReblogged) { // reblogged post
        await Notes.findByIdAndUpdate(doc.notes,
            {
                $push: {
                    notes: {
                        type: 'reblog',
                        blogId: doc.blogAttribution,
                        rebloggedPostId: doc.trail[doc.trail.length - 1],
                        postId: doc._id,
                    },
                    posts: doc._id,
                },
            }, {new: true});
    }
});
const blogAttribution = {
    _id: true,
    title: true,
    handle: true,
    avatar: true,
    isAvatarCircle: true,
    owner: true,
};
const postAttribution = {
    blogAttribution: blogAttribution,
};
postSchema.pre(/find*/, function(next) {
    this
        .populate('blogAttribution', blogAttribution)
        .populate('trail', postAttribution)
        .populate('trail', '-trail');
    next();
});
postSchema.index({
    'content.text': 'text',
    'tags': 'text',
});
const postModel = mongoose.model('Post', postSchema);

module.exports = {postSchema, postModel, postAttribution, blogAttribution};

/**
* @swagger
* components:
*    InlineTextFormat:
*      description: |
*        In addition to subtypes at the Text block level,
*
*        the text within a Text block can have inline styles like bold,
*        italic, external links, blog mentions, and colors.
*
*        Inline formatting ranges (start and end) are zero-indexed.
*
*        Ranges are inclusive at the start and inclusive at the end.
*      type: object
*      required:
*        - start
*        - end
*        - type
*      properties:
*        start:
*          type: integer
*          minimum: 0
*          description: The starting index of the formatting range (inclusive)
*        end:
*          type: integer
*          minimum: 0
*          description: The ending index of the formatting range (inclusive)
*        type:
*          type: string
*          enum:
*            - bold
*            - italic
*            - strikethrough
*            - small
*            - link
*            - mention
*            - color
*          description: |
*            Inline Format Types: Bold, Italic, Strikethrough, Small
*            The basic inline formatting types that require no additional information
*            are bold, italic, strikethrough, and small.
*    ColorTextFormat:
*      required:
*        - type
*        - hex
*      properties:
*        start:
*          type: integer
*          minimum: 0
*          description: The starting index of the formatting range (inclusive)
*        end:
*          type: integer
*          minimum: 0
*          description: The ending index of the formatting range (inclusive)
*        type:
*          type: string
*          description: you should set it to "color" in order to use color formatting
*        hex:
*          type: string
*          example: "#ffffff"
*    LinkTextFormat:
*      required:
*        - type
*        - url
*      properties:
*        start:
*          type: integer
*          minimum: 0
*          description: The starting index of the formatting range (inclusive)
*        end:
*          type: integer
*          minimum: 0
*          description: The ending index of the formatting range (inclusive)
*        type:
*          type: string
*          description: you should set it to "link" in order to use link formatting
*        url:
*          type: string
*          example: https://www.tumblr.com/dashboard
*
*    MentionTextFormat:
*      required:
*        - uuid
*      properties:
*        start:
*          type: integer
*          minimum: 0
*          description: The starting index of the formatting range (inclusive)
*        end:
*          type: integer
*          minimum: 0
*          description: The ending index of the formatting range (inclusive)
*        type:
*          type: string
*          description: you should set it to "mention" in order to use mention formatting
*        uuid:
*          type: string
*          description: the id of the mentioned blog
*        name:
*          type: string
*          description: the name of the mentioned blog
*        url:
*          type: string
*          example: https://www.tumblr.com/dashboard
*
*    TextBlock:
*      type: object
*      required:
*        - text
*        - type
*      properties:
*        type:
*          type: string
*          description: must be "text" for text blocks
*        text:
*          type: string
*          description: The text to use inside this block
*        subtype:
*          type: string
*          enum:
*            - heading1
*            - heading2
*            - quirky
*            - quote
*            - indented
*            - chat
*            - ordered-list-item
*            - unordered-list-item
*          description: |
*
*            `heading1` :
*              Intended for Post headings.
*
*            `heading2` :
*              Intended for section subheadings.
*
*            `quirky` :
*              TumblrX Official clients display this with a large cursive font.
*
*            `quote` :
*              Intended for short quotations, official TumblrX clients display this with a large serif font.
*
*            `indented` :
*              Intended for longer quotations or photo captions, official TumblrX clients indent this text block.
*
*            `chat` :
*              Intended to mimic the behavior of the Chat Post type,
*               official TumblrX clients display this with a monospace font.
*
*            `ordered-list-item` :
*              Intended to be an ordered list item prefixed by a number, see next section.
*
*            `unordered-list-item` :
*              Intended to be an unordered list item prefixed with a bullet, see next section.
*        indentLevel:
*          type: integer
*          minimum: 0
*          maximum: 7
*          description: |
*            You can create nested lists via an indent_level field that can appear in text blocks
*
*            of subtype ordered-list-item, unordered-list-item, or indented (blockquotes).
*
*            The default indent_level is 0 for all cases.
*
*            An indent_level of 1 with a list item subtype means the list item is nested;
*
*            an indent_level of 2 means it is doubly nested,etc. up to the maximum of 7.
*        formatting:
*          type: array
*          items:
*            type: object
*            oneOf:
*              - $ref: "#/components/InlineTextFormat"
*              - $ref: "#/components/ColorTextFormat"
*              - $ref: "#/components/LinkTextFormat"
*              - $ref: "#/components/MentionTextFormat"
*    ImageBlock:
*      type: object
*      required:
*        - media
*        - identifier
*        - type
*      properties:
*        type:
*          type: string
*          description: must be "image" for image blocks
*        identifier:
*          type: string
*          writeOnly: true
*          description: To specify which media data pertains to which block,
*           we use a unique identifier in the JSON body and this identifier is used as the key in the form data.
*        media:
*          type: string
*          description: image mime type
*          example: image/png
*
*        url:
*          type: string
*        altText:
*          description: Text used to describe the image, for screen readers.
*          type: string
*        caption:
*          description: A caption typically shown under the image
*          type: string
*        width:
*          type: string
*        height:
*          type: string
*    PosterImage:
*      type: object
*      properties:
*         media:
*          type: string
*          description: image mime type
*          example: image/png
*         url:
*          type: string
*    VideoBlock:
*      required:
*        - type
*        - identifier
*        - url
*        - type
*      properties:
*            identifier:
*               type: string
*               description: used to identify the uploaded file. required only for uploaded media. will not be saved
*            url:
*               type: string
*               description: video url this is required in case of not uploading a file.
*            type:
*               type: string
*               description: must be "video" in order to upload video
*            media:
*              type: string
*              description: the mime type of the video
*              example: video/mpeg
*            provider:
*              type: string
*              description: |
*                video provider can be tumblrx for uploaded videos or
*
*                some trusted website like youtube
*              enum:
*                - tumblrx
*                - youtube
*            title:
*              type: string
*            artist:
*              type: string
*            album:
*              type: string
*            poster:
*              type: object
*              allOf:
*                - $ref: "#components/PosterImage"
*
*    AudioBlock:
*      required:
*        - type
*        - identifier
*        - url
*        - type
*      properties:
*            identifier:
*               type: string
*               description: used to identify the uploaded file. required only for uploaded media. will not be saved
*            url:
*               type: string
*               description: audio url this is required in case of not uploading a file.
*            type:
*               type: string
*               description: must be "audio" in order to upload video
*            media:
*              type: string
*              description: the mime type of the audio
*              example: audio/mp3
*            provider:
*              type: string
*              description: |
*                audio provider can be tumblrx for uploaded audio or
*
*                some trusted website like soundcloud
*              enum:
*                - tumblrx
*                - soundcloud
*            title:
*              type: string
*            artist:
*              type: string
*            album:
*              type: string
*            poster:
*              type: object
*              allOf:
*                - $ref: "#components/PosterImage"
*
*    LinkBlock:
*      type: object
*      required:
*        - url
*        - title
*        - type
*      description: |
*           In addition to the inline link format,
*
*           there is a standalone Link content block, which contains metadata about the link
*      properties:
*        type:
*          type: string
*          description: must be "link" for link blocks
*        url:
*          type: string
*          description: The URL to use for the link block.
*        title:
*          type: string
*        description:
*          type: string
*        author:
*          type: string
*        poster:
*          type: object
*          allOf:
*            - $ref: "#components/PosterImage"
*    RowLayoutBlock:
*      required:
*        - display
*      properties:
*        display:
*          type: array
*          description: |
*            Each rows layout object requires a display object under the display key.
*
*            This display object is an array of dictionaries containing both
*             the array of blocks to be used in the row as well as an optional mode dictionary with a specified type.
*
*            The default display mode is weighted.
*
*            The display mode type does not need to be specified when creating a Post .
*
*            each one representing a different row to be rendered with the given content blocks.
*          items:
*            type: object
*            required:
*              - blocks
*            properties:
*              blocks:
*                type: array
*                items:
*                  type: integer
*
*              mode:
*                type: string
*                description: |
*                  * `weighted` : splits the space evenly between the row block
*
*                                for example if we have 5 blocks each should take 20% of the width.
*
*                  * `carousel` :  A carousel display mode signifies that
*
*                                  the client should use a horizontally paging view where each block
*                                  occupies 100% of the width
*
*                                  of the screen (a "page") and scrolling snaps to the center of a "page".
*                default: weighted
*                enum:
*                  - weighted
*                  - carousel
*        truncateAfter:
*          type: integer
*          description: |
*              Each rows layout can have truncateAfter property that describes
*
*              how the content should be truncated.
*
*              In other words, it is expected that "read more" is inserted below.
*
*              `Note` :The truncateAfter can be the starting block but not the ending block.
*              That is, the read more can come before all the
*
*              blocks (i.e. all the content in the post is under the read more),
*               and the truncateAfter will be -1. However, it
*
*              cannot come at the very last block where there is no content under it, or after (invalid index).
*
*              Moreover, truncateAfter cannot divide blocks in the same row.
*      example:
*        type: row
*        display:
*          - blocks: [0,1]
*          - blocks: [2]
*        truncateAfter: 1
*
*
*    AskLayoutBlock:
*      required:
*        - blocks
*      description: only provided if this post is of type ask.
*      properties:
*        questionBlocks:
*          type: array
*          items:
*            type: integer
*          description: This is an array of block indices that are a part of the ask content of the Post.
*
*        attribution:
*          type: object
*          $ref: '#/components/schemas/BlogAttribution'
*          description: If the ask is not anonymous,
*                 this will include information about the blog that submitted the ask.
*    PostCreator:
*          type: object
*          required:
*            - content
*          properties:
*            state:
*               type: string
*               description: |
*                    `published` means the post should be publicly published immediately.
*
*                    `draft` means the post should be saved as a draft.
*
*                    `private` means the post should be privately published immediately.
*
*                    `submission` means the post is a new submission.
*               default: published
*               enum:
*                  - published
*                  - draft
*                  - private
*                  - submission
*            title:
*              type: string
*              description: The post title
*            postType:
*               type: string
*               default: text
*               enum:
*                   - text
*                   - ask
*                   - quote
*                   - link
*                   - answer
*                   - video
*                   - audio
*                   - photo
*            content:
*              type: array
*              items:
*                oneOf:
*                  - $ref: "#components/TextBlock"
*                  - $ref: "#components/ImageBlock"
*                  - $ref: "#components/VideoBlock"
*                  - $ref: "#components/AudioBlock"
*                  - $ref: "#components/LinkBlock"
*            rowLayout:
*              type: object
*              $ref: "#components/RowLayoutBlock"
*              description: |
*                To lay out the blocks of a Post in a way that's different than the default vertical stack,
*
*                you can use the optional layout block alongside the content block array.
*
*                The layout block holds an array of layouts.
*
*                Each layout object requires a type field, just like content blocks.
*
*                if you use row layout you MUST reference all the blocks
*    schemas:
*        PostAttribution:
*           type: object
*           allOf:
*               - $ref: '#/components/PostCreator'
*           properties:
*               askLayout:
*                 type: object
*                 $ref: "#components/AskLayoutBlock"
*
*               blogAttribution:
*                 type: object
*                 allOf:
*                   - $ref: '#/components/schemas/BlogAttribution'
*                 description: |
*                       the blog that contains this post similar to blog info route
*
*                       `NOTE` provide blog id in case you are creating a post.
*
*
*        Post:
*          allOf:
*              - $ref: '#/components/schemas/PostAttribution'
*          properties:
*            submittedBy:
*               allOf:
*                   - $ref: '#/components/schemas/BlogAttribution'
*               description: |
*                   the blog who submitted this post
*            commentsCount:
*               type: integer
*               description: number of comments on this post
*            likesCount:
*               type: integer
*               description: number of people who likes this post
*            reblogsCount:
*               type: integer
*               description: number of people who rebloged this post
*            notesCount:
*               type: integer
*               description: number of notes on this post
*            publishedOn:
*             type: integer
*             description: |
*                   date to publish the post . a  Unix timestamp, in seconds.
*            trail:
*             type: array
*             items:
*                allOf:
*                     - $ref: '#/components/schemas/PostAttribution'
*            tags:
*               type: array
*               items:
*                   type: string
*               description: tags included in this post
 */
