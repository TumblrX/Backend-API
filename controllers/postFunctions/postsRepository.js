const Post = require('../../models/Post').postModel;
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * wrapper around post query
 * @class PostQueryBuilder
 */
class PostQueryBuilder {
    /**
     * @constructor
     */
    constructor() {
        this.query = Post.find();
        this.sortByDate = true;
    }
    /**
     * get post with id
     * @param {string} id post id
     * @return {PostQueryBuilder}
     */
    withId(id) {
        if (id) {
            this.query = this.query.find({_id: ObjectId(id)});
        }
        return this;
    }
    /**
     * get post written by blogs
     * @param {Array} blogIds blog ids
     * @return {PostQueryBuilder}
     */
    writtenBy(blogIds) {
        blogIds = blogIds.filter((item) => item);// remove all undefined
        if (blogIds && blogIds.length) {
            this.query = this.query.find({
                blogAttribution: {
                    $in: blogIds,
                },
            });
        }
        return this;
    }
    /**
     * search in posts
     * @param {string} q query
     * @param {Array} orWrittenBy blogs
     * @return {PostQueryBuilder}
     */
    search(q, orWrittenBy) {
        const $or = [];
        if (q) {
            $or.push({
                $text: {
                    $search: q,
                },
            });
            this.sortByDate = false;
        }
        if (orWrittenBy.length > 0) {
            $or.push({
                blogAttribution: {
                    $in: orWrittenBy,
                },
            });
        }
        if ($or.length) {
            this.find({$or});
        }
        return this;
    }
    /**
    * sort the posts
    * @param {string} attr attribute name to sort with
    * @param {boolean} forceSort force sorting by this attribute.
    * @return {PostQueryBuilder}
    */
    sort(attr, forceSort) {
        if (attr) {
            if (this.sortByDate || forceSort) {
                this.query = this.query.sort(attr);
            }
        }
        return this;
    }
    /**
    * offset the results.
    * @param {string|Number} offset result offset
    * @return {PostQueryBuilder}
    */
    skip(offset) {
        offset = offset || 0;
        this.query = this.query.skip(offset * 1);
        return this;
    }
    /**
    * limit the results count.
    * @param {string|Number} resLimit result count limit
    * @return {PostQueryBuilder}
    */
    limit(resLimit) {
        resLimit = resLimit || 20;
        this.query = this.query.limit(resLimit * 1);
        return this;
    }
    /**
    * find posts with parameters.
    * @param {Object} obj
    * @return {PostQueryBuilder}
    */
    find(obj) {
        if (obj) {
            this.query = this.query.find(obj);
        }
        return this;
    }
    /**
    * get posts containing all the tags.
    * @param {Array} tags tags
    * @return {PostQueryBuilder}
    */
    containTags(tags) {
        if (tags) {
            this.query = this.query.find({
                tags: {$all: tags.split(',')},
            });
        }
        return this;
    }
    /**
    * get posts with type.
    * @param {string} type post type
    * @return {PostQueryBuilder}
    */
    withType(type) {
        if (type) {
            const allowedTypes = ['audio', 'text', 'video', 'image', 'link'];
            if (allowedTypes.includes(type)) {
                this.query = this.query.find({
                    content: {
                        $elemMatch: {type},
                    },
                });
            }
        }
        return this;
    }
    /**
    * get posts written before a specific
    * @param {number} time publish time.
    * @return {PostQueryBuilder}
    */
    before(time) {
        if (time) {
            this.query = this.query.find({publishedOn: {$lte: time}});
        }
        return this;
    }
    /**
    * execute the query.
    * @param {Array} states post states default ['published'].
    * @return {Array} array of {Post}.
    */
    async exec(states) {
        const obj = {
            state: {
                $in: states || ['published'],
            },
        };
        return await this.query.find(obj);
    }
}
module.exports = PostQueryBuilder;
