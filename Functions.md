## Classes

<dl>
<dt><a href="#PostQueryBuilder">PostQueryBuilder</a></dt>
<dd></dd>
<dt><a href="#PostQueryBuilder">PostQueryBuilder</a></dt>
<dd></dd>
<dt><a href="#AppError">AppError</a></dt>
<dd><p>Class representing a AppError that should be shown to the user.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#auth">auth</a></dt>
<dd><p>auth</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#catchAsync">catchAsync(fn)</a> ⇒ <code>function</code></dt>
<dd><p>This Function handles errors that&#39;s thrown through async function passing it
 to the next()  so that express error  handler handles that error and decides
whether to send that error to the user or not.</p>
<p>so when you use it you will not need try catch block.</p>
</dd>
<dt><a href="#canWriteToBlog">canWriteToBlog(blogId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>check if user can write to a blog.</p>
</dd>
<dt><a href="#getAllBlogs">getAllBlogs()</a> ⇒ <code>Array</code></dt>
<dd><p>get all blogs that the user can write to.</p>
</dd>
<dt><a href="#isJSON">isJSON(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the sent string can be converted to json format</p>
</dd>
<dt><a href="#validRequest">validRequest(body, files)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the sent request is empty or not
return false if empty request
return true if not empty request</p>
</dd>
<dt><a href="#belong">belong(blogs, primaryBlog, blogId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the sent blogId belongs to the user makeing the request</p>
</dd>
<dt><a href="#checkData">checkData(body, blog)</a> ⇒ <code>Boolean</code></dt>
<dd><p>fuction to convert the sent data in the request body to json format
returns true the user sent some data
return false if the user did not</p>
</dd>
<dt><a href="#CheckImage">CheckImage(req, blog)</a></dt>
<dd><p>function to check if the user uploaded any images
if the user uploaded any images, it updated the blog avatar and imageHeader accordingly</p>
</dd>
<dt><a href="#updateLogic">updateLogic(req, res, next)</a></dt>
<dd><p>middleware that updates the custome appearence of the blog</p>
</dd>
<dt><a href="#checkEmailPassword">checkEmailPassword(userEmail, userPassword, body)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the sent email and password belong to the user makeing the request;
return false if the sent data is wrong
else return true</p>
</dd>
<dt><a href="#deleteBlog">deleteBlog(user, blogId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function that deletest the user if the sent blog id is the primary blog id, or deletes the secondary blog
returns false if the send blog id does not belong to user makeing the request
else return true</p>
</dd>
<dt><a href="#deleteLogic">deleteLogic(req, res, next)</a></dt>
<dd><p>middleware to delete the blog primary or secondry</p>
</dd>
<dt><a href="#checkCreate">checkCreate(body)</a> ⇒ <code>String</code></dt>
<dd><p>function to check if the blog to be created is private or public
if private then check for sent password
return the hashed password of the blog
return true if blog is private but to password is sent
return none if blog if public</p>
</dd>
<dt><a href="#createBlog">createBlog(req, hashPassword)</a> ⇒ <code>Object</code></dt>
<dd><p>function that create a blog and return the created blog</p>
</dd>
<dt><a href="#isRepeatedHandle">isRepeatedHandle(handle)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the there exists a blog with such handle
if exits return true
else return false</p>
</dd>
<dt><a href="#createLogic">createLogic(req, res, next)</a></dt>
<dd><p>middleware that creates a new blog from request body</p>
</dd>
<dt><a href="#checkFound">checkFound(blogId)</a> ⇒ <code>Object</code></dt>
<dd><p>function to check if there exits a blod with such id
return the blog if found
else return empty object</p>
</dd>
<dt><a href="#checkPrivate">checkPrivate(isPrivate)</a> ⇒ <code>Boolean</code></dt>
<dd><p>function to check if the blog is private or public
return true if public
return false</p>
</dd>
<dt><a href="#retrievePosts">retrievePosts(blog)</a> ⇒ <code>Array</code></dt>
<dd><p>function to retrieve all the blogs that belong to sent blog
if the blog has no posts, return empty array</p>
</dd>
<dt><a href="#getArraysIntersection">getArraysIntersection(blockedTumblrs, userBlogs)</a> ⇒ <code>boolean</code></dt>
<dd><p>function that returns true if the two arrays have something in common
return false if no intersection between these two arrays</p>
</dd>
<dt><a href="#getLogic">getLogic(req, res, next)</a></dt>
<dd><p>middleware returns the blog whose id or handle is sent in the request body</p>
</dd>
<dt><a href="#searchBlogs">searchBlogs(query, limit, start)</a> ⇒ <code>Array</code></dt>
<dd><p>search for blogs</p>
</dd>
<dt><a href="#follows">follows(blog, user)</a> ⇒ <code>Boolean</code></dt>
<dd><p>check if user is following a blog</p>
</dd>
<dt><a href="#addIsFollowingToABlog">addIsFollowingToABlog(blog, user)</a></dt>
<dd><p>adds is followed flag to a blog</p>
</dd>
<dt><a href="#addIsFollowingToBlogs">addIsFollowingToBlogs(blogs, user)</a></dt>
<dd><p>adds is followed flag to blogs array</p>
</dd>
<dt><a href="#formQuery">formQuery(user)</a> ⇒ <code>object</code></dt>
<dd><p>function to form a query to be used in other explore blog functions</p>
</dd>
<dt><a href="#retrieveTrendingBlogs">retrieveTrendingBlogs(startIndex, user)</a> ⇒ <code>Array</code></dt>
<dd><p>function to retrieve the blogs with the most number of followers
the function returns an array of trending blogs</p>
</dd>
<dt><a href="#getTrendingBlogs">getTrendingBlogs(req, res, next)</a></dt>
<dd><p>middleware returns an array of trending blogs</p>
</dd>
<dt><a href="#retrieveForYouBlogs">retrieveForYouBlogs(startIndex, user)</a> ⇒ <code>Array</code></dt>
<dd><p>function to retrieve the blogs which are reandomly selected
the function returns an array of 4 randomly selected blogs</p>
</dd>
<dt><a href="#getForYouBlogs">getForYouBlogs(req, res, next)</a></dt>
<dd><p>middleware returns an array of trending blogs</p>
</dd>
<dt><a href="#blogAdmin">blogAdmin(req, res, next)</a></dt>
<dd><p>middleware sends a 403 response if the user can&#39;t write to a blog.</p>
</dd>
<dt><a href="#blockedBlogsFilter">blockedBlogsFilter(req, res, next)</a></dt>
<dd><p>middleware sends a 403 response if the user access this blog.
this may happen when the user already blocked this blog or if the blog blocked this user.</p>
</dd>
<dt><a href="#privateBlog">privateBlog(req, res, next)</a></dt>
<dd><p>middleware sends a 403 response if this blog is private and password wasn&#39;t provided.</p>
</dd>
<dt><a href="#handleUploadedMedia">handleUploadedMedia(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that handles the uploaded media.</p>
</dd>
<dt><a href="#protectAttributes">protectAttributes(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that handles the removes the protected attributes from req body.</p>
</dd>
<dt><a href="#reblog">reblog(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that handles blog rebloging a post.</p>
</dd>
<dt><a href="#create">create(req, res, next)</a></dt>
<dd><p>middleware that creates a new post from request body..</p>
</dd>
<dt><a href="#update">update(req, res, next)</a></dt>
<dd><p>middleware that updates a post from request body..</p>
</dd>
<dt><a href="#delete">delete(req, res, next)</a></dt>
<dd><p>middleware that deletes a post.</p>
</dd>
<dt><a href="#addIsFollowedToPostBlog">addIsFollowedToPostBlog(posts, user)</a> ⇒ <code>Array</code></dt>
<dd><p>add is followed boolean to post blog</p>
</dd>
<dt><a href="#addIsLikedToPosts">addIsLikedToPosts(posts, user)</a> ⇒ <code>Array</code></dt>
<dd><p>add liked boolean to post object</p>
</dd>
<dt><a href="#findPost">findPost(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>get post by id</p>
</dd>
<dt><a href="#getPostsAlias">getPostsAlias(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>alias route for searching the posts.</p>
</dd>
<dt><a href="#getPosts">getPosts(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that gets all posts published by a blog.</p>
</dd>
<dt><a href="#draft">draft(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that gets all draft for a blog.</p>
</dd>
<dt><a href="#ensureSafeCreation">ensureSafeCreation(post)</a> ⇒ <code>Object</code></dt>
<dd><p>removes the post attributes that the user can&#39;t change</p>
</dd>
<dt><a href="#validateComment">validateComment(comment)</a> ⇒ <code>Boolean</code></dt>
<dd><p>validates a comment on a post</p>
</dd>
<dt><a href="#comment">comment(req, res, next)</a></dt>
<dd><p>middleware to comment on a post</p>
</dd>
<dt><a href="#canDelete">canDelete(comment, blog)</a> ⇒ <code>Boolean</code></dt>
<dd><p>check if a comment was successfully deleted</p>
</dd>
<dt><a href="#deleteComment">deleteComment(req, res, next)</a></dt>
<dd><p>middleware to delete a comment</p>
</dd>
<dt><a href="#filterNotes">filterNotes(notes, mode, before)</a> ⇒ <code>Array</code></dt>
<dd><p>filter post notes</p>
</dd>
<dt><a href="#getNote">getNote(req, res, next)</a></dt>
<dd><p>middleware to get notes on a post</p>
</dd>
<dt><a href="#createSubmissionPost">createSubmissionPost(body, blogId, user)</a> ⇒ <code>Object</code></dt>
<dd><p>creates a post to be submitted to a blog</p>
</dd>
<dt><a href="#submitPost">submitPost(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that submits a post to a blog.
requires the user to be logged in</p>
</dd>
<dt><a href="#submittedPosts">submittedPosts(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that returns all the submitted posts to a blog.
requires the user to be the owner of this blog.</p>
</dd>
<dt><a href="#deleteSubmittedPost">deleteSubmittedPost(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that deletes a submitted post.
requires the user to be the owner of this blog.</p>
</dd>
<dt><a href="#acceptSubmittedPost">acceptSubmittedPost(req, res, next)</a> ⇒ <code>void</code></dt>
<dd><p>middleware that accepts a submitted post.
requires the user to be the owner of this blog.</p>
</dd>
<dt><a href="#retrieveTrendingPosts">retrieveTrendingPosts(startIndex, query, userBlogs)</a> ⇒ <code>Array</code></dt>
<dd><p>function to retrieve the posts with the most number of comments, likes and reblogs
the function returns an array of trending posts</p>
</dd>
<dt><a href="#getTrendingPosts">getTrendingPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts</p>
</dd>
<dt><a href="#retrieveForYouPosts">retrieveForYouPosts(startIndex, userBlogs)</a> ⇒ <code>Array</code></dt>
<dd><p>function to retrieve the random posts
the function returns an array of randomly selected posts</p>
</dd>
<dt><a href="#getTrendingTextPosts">getTrendingTextPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts of type text ONLY</p>
</dd>
<dt><a href="#getTrendingPhotoPosts">getTrendingPhotoPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts of type PHOTO only</p>
</dd>
<dt><a href="#getTrendingVideoPosts">getTrendingVideoPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts of type VIDEO only</p>
</dd>
<dt><a href="#getTrendingAskPosts">getTrendingAskPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts of type ASK only</p>
</dd>
<dt><a href="#getTrendingAudioPosts">getTrendingAudioPosts(req, res, next)</a></dt>
<dd><p>middleware returns an arrays for the tending posts of type AUDIO only</p>
</dd>
<dt><a href="#getPayloadFromGoogle">getPayloadFromGoogle(idToken)</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to get user information from google using id_token</p>
</dd>
<dt><a href="#createUserFromPayload">createUserFromPayload(payload)</a></dt>
<dd><p>This function is used to create a new user in the database based on google information</p>
</dd>
<dt><a href="#SaveForgotPasswordToken">SaveForgotPasswordToken(id)</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to generate a token for the user and save it in redis</p>
</dd>
<dt><a href="#sendForgotPasswordEmail">sendForgotPasswordEmail(id, email)</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to generate a token for the user and mail it to them</p>
</dd>
<dt><a href="#SaveVerificationToken">SaveVerificationToken(id)</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to generate a token for the user and save it in redis</p>
</dd>
<dt><a href="#sendVerificationEmail">sendVerificationEmail(id, email)</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to generate a token for the user and mail it to them</p>
</dd>
<dt><a href="#sendNewPasswordEmail">sendNewPasswordEmail(email, password)</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to mail the new user&#39;s password it to them</p>
</dd>
<dt><a href="#userExists">userExists(user)</a> ⇒ <code>String</code></dt>
<dd><p>This function checks if user exists in the database</p>
</dd>
<dt><a href="#primaryBlogExists">primaryBlogExists(blog)</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function checks if blog exists in the database</p>
</dd>
<dt><a href="#canCreateUser">canCreateUser(user{username,)</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function checks if user can be created such that it is unique in the database</p>
</dd>
<dt><a href="#saveSettings">saveSettings(data, id)</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function updates user settings in the database based on the changed settings only</p>
</dd>
<dt><a href="#setEmailVerified">setEmailVerified(id)</a></dt>
<dd><p>This function updates user email verification status to true in the database</p>
</dd>
<dt><a href="#updatePasswordWithToken">updatePasswordWithToken(id, password)</a></dt>
<dd><p>This function updates user&#39;s password in the database and delete the &quot;forget password&quot; token</p>
</dd>
<dt><a href="#updateUserPassword">updateUserPassword(id, password)</a></dt>
<dd><p>This function hashes and updates user&#39;s password in the database</p>
</dd>
<dt><a href="#sendJWT">sendJWT(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>This function sends users&#39;s info along with his JWT token in the response</p>
</dd>
<dt><a href="#getPostsPerBlog">getPostsPerBlog(user)</a> ⇒ <code>Object</code></dt>
<dd><p>This function calculates how many posts a user has in each blog</p>
</dd>
<dt><a href="#getUserBlogs">getUserBlogs(user)</a> ⇒ <code>Object</code></dt>
<dd><p>This function returns user&#39;s blogs info in details</p>
</dd>
<dt><a href="#addIsLikedToPostsJSON">addIsLikedToPostsJSON(posts, user)</a> ⇒ <code>ArrayOfPosts</code></dt>
<dd><p>This function adds a flag to posts if the user has liked it</p>
</dd>
<dt><a href="#addTagFlagToPost">addTagFlagToPost(posts, followingTags)</a> ⇒ <code>ArrayOfPosts</code></dt>
<dd><p>This function adds an array of tags to post if the user follows any of its tags</p>
</dd>
<dt><a href="#getPostsForUser">getPostsForUser(blogs, followingTags, page, limit)</a> ⇒ <code>ArrayOfPosts</code></dt>
<dd><p>This function gets the posts of the blogs and tags the user follows based on his current page</p>
</dd>
<dt><a href="#getUserFriends">getUserFriends(user)</a> ⇒ <code>ArrayOfUsers</code></dt>
<dd><p>This function finds the other users who follows this user back</p>
</dd>
<dt><a href="#addFriendsToBlogs">addFriendsToBlogs(user, blogs)</a> ⇒ <code>ArrayOfBlogs</code></dt>
<dd><p>This function adds a flag to blog is its owner is friend of the user</p>
</dd>
<dt><a href="#getTagsPhotosFromPostsWithTags">getTagsPhotosFromPostsWithTags(postsWithTags)</a> ⇒ <code>Object</code></dt>
<dd><p>This extracts tags and photos from posts which has both</p>
</dd>
<dt><a href="#setNewPassword">setNewPassword(email, password)</a></dt>
<dd><p>This function hashes and updates user&#39;s password in the database</p>
</dd>
<dt><a href="#notifyUser">notifyUser(userId, eventName, notificationBody)</a> ⇒ <code>Response</code></dt>
<dd><p>notify the user with {userId} with about {eventName}</p>
</dd>
<dt><a href="#notifyBlog">notifyBlog(blog, eventName, notificationBody)</a> ⇒ <code>Response</code></dt>
<dd><p>notify the blog owner about {eventName}</p>
</dd>
<dt><a href="#removeDuplicates">removeDuplicates(stringArr)</a> ⇒ <code>String</code></dt>
<dd></dd>
</dl>

<a name="PostQueryBuilder"></a>

## PostQueryBuilder
**Kind**: global class  

* [PostQueryBuilder](#PostQueryBuilder)
    * [new PostQueryBuilder()](#new_PostQueryBuilder_new)
    * [.withId(id)](#PostQueryBuilder+withId) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.writtenBy(blogIds)](#PostQueryBuilder+writtenBy) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.search(q, orWrittenBy)](#PostQueryBuilder+search) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.sort(attr, forceSort)](#PostQueryBuilder+sort) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.skip(offset)](#PostQueryBuilder+skip) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.limit(resLimit)](#PostQueryBuilder+limit) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.find(obj)](#PostQueryBuilder+find) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.containTags(tags)](#PostQueryBuilder+containTags) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.withType(type)](#PostQueryBuilder+withType) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.before(time)](#PostQueryBuilder+before) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.exec(states)](#PostQueryBuilder+exec) ⇒ <code>Array</code>

<a name="new_PostQueryBuilder_new"></a>

### new PostQueryBuilder()
wrapper around post query

<a name="PostQueryBuilder+withId"></a>

### postQueryBuilder.withId(id) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get post with id

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | post id |

<a name="PostQueryBuilder+writtenBy"></a>

### postQueryBuilder.writtenBy(blogIds) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get post written by blogs

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| blogIds | <code>Array</code> | blog ids |

<a name="PostQueryBuilder+search"></a>

### postQueryBuilder.search(q, orWrittenBy) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
search in posts

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>string</code> | query |
| orWrittenBy | <code>Array</code> | blogs |

<a name="PostQueryBuilder+sort"></a>

### postQueryBuilder.sort(attr, forceSort) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
sort the posts

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | attribute name to sort with |
| forceSort | <code>boolean</code> | force sorting by this attribute. |

<a name="PostQueryBuilder+skip"></a>

### postQueryBuilder.skip(offset) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
offset the results.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>string</code> \| <code>Number</code> | result offset |

<a name="PostQueryBuilder+limit"></a>

### postQueryBuilder.limit(resLimit) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
limit the results count.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| resLimit | <code>string</code> \| <code>Number</code> | result count limit |

<a name="PostQueryBuilder+find"></a>

### postQueryBuilder.find(obj) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
find posts with parameters.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="PostQueryBuilder+containTags"></a>

### postQueryBuilder.containTags(tags) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts containing all the tags.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| tags | <code>Array</code> | tags |

<a name="PostQueryBuilder+withType"></a>

### postQueryBuilder.withType(type) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts with type.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | post type |

<a name="PostQueryBuilder+before"></a>

### postQueryBuilder.before(time) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts written before a specific

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | publish time. |

<a name="PostQueryBuilder+exec"></a>

### postQueryBuilder.exec(states) ⇒ <code>Array</code>
execute the query.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  
**Returns**: <code>Array</code> - array of {Post}.  

| Param | Type | Description |
| --- | --- | --- |
| states | <code>Array</code> | post states default ['published']. |

<a name="PostQueryBuilder"></a>

## PostQueryBuilder
**Kind**: global class  

* [PostQueryBuilder](#PostQueryBuilder)
    * [new PostQueryBuilder()](#new_PostQueryBuilder_new)
    * [.withId(id)](#PostQueryBuilder+withId) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.writtenBy(blogIds)](#PostQueryBuilder+writtenBy) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.search(q, orWrittenBy)](#PostQueryBuilder+search) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.sort(attr, forceSort)](#PostQueryBuilder+sort) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.skip(offset)](#PostQueryBuilder+skip) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.limit(resLimit)](#PostQueryBuilder+limit) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.find(obj)](#PostQueryBuilder+find) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.containTags(tags)](#PostQueryBuilder+containTags) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.withType(type)](#PostQueryBuilder+withType) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.before(time)](#PostQueryBuilder+before) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
    * [.exec(states)](#PostQueryBuilder+exec) ⇒ <code>Array</code>

<a name="new_PostQueryBuilder_new"></a>

### new PostQueryBuilder()
wrapper around post query

<a name="PostQueryBuilder+withId"></a>

### postQueryBuilder.withId(id) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get post with id

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | post id |

<a name="PostQueryBuilder+writtenBy"></a>

### postQueryBuilder.writtenBy(blogIds) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get post written by blogs

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| blogIds | <code>Array</code> | blog ids |

<a name="PostQueryBuilder+search"></a>

### postQueryBuilder.search(q, orWrittenBy) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
search in posts

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>string</code> | query |
| orWrittenBy | <code>Array</code> | blogs |

<a name="PostQueryBuilder+sort"></a>

### postQueryBuilder.sort(attr, forceSort) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
sort the posts

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | attribute name to sort with |
| forceSort | <code>boolean</code> | force sorting by this attribute. |

<a name="PostQueryBuilder+skip"></a>

### postQueryBuilder.skip(offset) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
offset the results.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>string</code> \| <code>Number</code> | result offset |

<a name="PostQueryBuilder+limit"></a>

### postQueryBuilder.limit(resLimit) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
limit the results count.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| resLimit | <code>string</code> \| <code>Number</code> | result count limit |

<a name="PostQueryBuilder+find"></a>

### postQueryBuilder.find(obj) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
find posts with parameters.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="PostQueryBuilder+containTags"></a>

### postQueryBuilder.containTags(tags) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts containing all the tags.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| tags | <code>Array</code> | tags |

<a name="PostQueryBuilder+withType"></a>

### postQueryBuilder.withType(type) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts with type.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | post type |

<a name="PostQueryBuilder+before"></a>

### postQueryBuilder.before(time) ⇒ [<code>PostQueryBuilder</code>](#PostQueryBuilder)
get posts written before a specific

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | publish time. |

<a name="PostQueryBuilder+exec"></a>

### postQueryBuilder.exec(states) ⇒ <code>Array</code>
execute the query.

**Kind**: instance method of [<code>PostQueryBuilder</code>](#PostQueryBuilder)  
**Returns**: <code>Array</code> - array of {Post}.  

| Param | Type | Description |
| --- | --- | --- |
| states | <code>Array</code> | post states default ['published']. |

<a name="AppError"></a>

## AppError
Class representing a AppError that should be shown to the user.

**Kind**: global class  
<a name="new_AppError_new"></a>

### new AppError(message, statusCode)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | the  error message |
| statusCode | <code>number</code> | response status code defaults to 500 |

<a name="auth"></a>

## auth
auth

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | request |
| res | <code>Response</code> | response |
| next | <code>function</code> | next |

<a name="catchAsync"></a>

## catchAsync(fn) ⇒ <code>function</code>
This Function handles errors that's thrown through async function passing it to the next()  so that express error  handler handles that error and decideswhether to send that error to the user or not.so when you use it you will not need try catch block.

**Kind**: global function  
**Returns**: <code>function</code> - another function with error handling  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | function that may throw error |

<a name="canWriteToBlog"></a>

## canWriteToBlog(blogId) ⇒ <code>Boolean</code>
check if user can write to a blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| blogId | <code>Object</code> | 

<a name="getAllBlogs"></a>

## getAllBlogs() ⇒ <code>Array</code>
get all blogs that the user can write to.

**Kind**: global function  
**Returns**: <code>Array</code> - array of ids of the blogs that this user own.  
<a name="isJSON"></a>

## isJSON(str) ⇒ <code>Boolean</code>
function to check if the sent string can be converted to json format

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="validRequest"></a>

## validRequest(body, files) ⇒ <code>Boolean</code>
function to check if the sent request is empty or notreturn false if empty requestreturn true if not empty request

**Kind**: global function  

| Param | Type |
| --- | --- |
| body | <code>Object</code> | 
| files | <code>Array</code> | 

<a name="belong"></a>

## belong(blogs, primaryBlog, blogId) ⇒ <code>Boolean</code>
function to check if the sent blogId belongs to the user makeing the request

**Kind**: global function  

| Param | Type |
| --- | --- |
| blogs | <code>Object</code> | 
| primaryBlog | <code>String</code> | 
| blogId | <code>String</code> | 

<a name="checkData"></a>

## checkData(body, blog) ⇒ <code>Boolean</code>
fuction to convert the sent data in the request body to json formatreturns true the user sent some datareturn false if the user did not

**Kind**: global function  

| Param | Type |
| --- | --- |
| body | <code>Object</code> | 
| blog | <code>Object</code> | 

<a name="CheckImage"></a>

## CheckImage(req, blog)
function to check if the user uploaded any imagesif the user uploaded any images, it updated the blog avatar and imageHeader accordingly

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| blog | <code>Object</code> | 

<a name="updateLogic"></a>

## updateLogic(req, res, next)
middleware that updates the custome appearence of the blog

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="checkEmailPassword"></a>

## checkEmailPassword(userEmail, userPassword, body) ⇒ <code>Boolean</code>
function to check if the sent email and password belong to the user makeing the request;return false if the sent data is wrongelse return true

**Kind**: global function  

| Param | Type |
| --- | --- |
| userEmail | <code>String</code> | 
| userPassword | <code>String</code> | 
| body | <code>Object</code> | 

<a name="deleteBlog"></a>

## deleteBlog(user, blogId) ⇒ <code>Boolean</code>
function that deletest the user if the sent blog id is the primary blog id, or deletes the secondary blogreturns false if the send blog id does not belong to user makeing the requestelse return true

**Kind**: global function  

| Param | Type |
| --- | --- |
| user | <code>Object</code> | 
| blogId | <code>String</code> | 

<a name="deleteLogic"></a>

## deleteLogic(req, res, next)
middleware to delete the blog primary or secondry

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="checkCreate"></a>

## checkCreate(body) ⇒ <code>String</code>
function to check if the blog to be created is private or publicif private then check for sent passwordreturn the hashed password of the blogreturn true if blog is private but to password is sentreturn none if blog if public

**Kind**: global function  

| Param | Type |
| --- | --- |
| body | <code>Object</code> | 

<a name="createBlog"></a>

## createBlog(req, hashPassword) ⇒ <code>Object</code>
function that create a blog and return the created blog

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| hashPassword | <code>String</code> | 

<a name="isRepeatedHandle"></a>

## isRepeatedHandle(handle) ⇒ <code>Boolean</code>
function to check if the there exists a blog with such handleif exits return trueelse return false

**Kind**: global function  

| Param | Type |
| --- | --- |
| handle | <code>String</code> | 

<a name="createLogic"></a>

## createLogic(req, res, next)
middleware that creates a new blog from request body

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="checkFound"></a>

## checkFound(blogId) ⇒ <code>Object</code>
function to check if there exits a blod with such idreturn the blog if foundelse return empty object

**Kind**: global function  

| Param | Type |
| --- | --- |
| blogId | <code>ObjectId</code> | 

<a name="checkPrivate"></a>

## checkPrivate(isPrivate) ⇒ <code>Boolean</code>
function to check if the blog is private or publicreturn true if publicreturn false

**Kind**: global function  

| Param | Type |
| --- | --- |
| isPrivate | <code>Boolean</code> | 

<a name="retrievePosts"></a>

## retrievePosts(blog) ⇒ <code>Array</code>
function to retrieve all the blogs that belong to sent blogif the blog has no posts, return empty array

**Kind**: global function  

| Param | Type |
| --- | --- |
| blog | <code>Object</code> | 

<a name="getArraysIntersection"></a>

## getArraysIntersection(blockedTumblrs, userBlogs) ⇒ <code>boolean</code>
function that returns true if the two arrays have something in commonreturn false if no intersection between these two arrays

**Kind**: global function  

| Param | Type |
| --- | --- |
| blockedTumblrs | <code>array</code> | 
| userBlogs | <code>array</code> | 

<a name="getLogic"></a>

## getLogic(req, res, next)
middleware returns the blog whose id or handle is sent in the request body

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="searchBlogs"></a>

## searchBlogs(query, limit, start) ⇒ <code>Array</code>
search for blogs

**Kind**: global function  
**Returns**: <code>Array</code> - array of blogs match this criteria.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | query to search for |
| limit | <code>Number</code> | result length |
| start | <code>Number</code> | start index |

<a name="follows"></a>

## follows(blog, user) ⇒ <code>Boolean</code>
check if user is following a blog

**Kind**: global function  

| Param | Type |
| --- | --- |
| blog | <code>blog</code> | 
| user | <code>user</code> | 

<a name="addIsFollowingToABlog"></a>

## addIsFollowingToABlog(blog, user)
adds is followed flag to a blog

**Kind**: global function  

| Param | Type |
| --- | --- |
| blog | <code>Array</code> | 
| user | <code>User</code> | 

<a name="addIsFollowingToBlogs"></a>

## addIsFollowingToBlogs(blogs, user)
adds is followed flag to blogs array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| blogs | <code>Array</code> | array of blogs |
| user | <code>User</code> |  |

<a name="formQuery"></a>

## formQuery(user) ⇒ <code>object</code>
function to form a query to be used in other explore blog functions

**Kind**: global function  

| Param | Type |
| --- | --- |
| user | <code>object</code> | 

<a name="retrieveTrendingBlogs"></a>

## retrieveTrendingBlogs(startIndex, user) ⇒ <code>Array</code>
function to retrieve the blogs with the most number of followersthe function returns an array of trending blogs

**Kind**: global function  

| Param | Type |
| --- | --- |
| startIndex | <code>int</code> | 
| user | <code>object</code> | 

<a name="getTrendingBlogs"></a>

## getTrendingBlogs(req, res, next)
middleware returns an array of trending blogs

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="retrieveForYouBlogs"></a>

## retrieveForYouBlogs(startIndex, user) ⇒ <code>Array</code>
function to retrieve the blogs which are reandomly selectedthe function returns an array of 4 randomly selected blogs

**Kind**: global function  

| Param | Type |
| --- | --- |
| startIndex | <code>int</code> | 
| user | <code>object</code> | 

<a name="getForYouBlogs"></a>

## getForYouBlogs(req, res, next)
middleware returns an array of trending blogs

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="blogAdmin"></a>

## blogAdmin(req, res, next)
middleware sends a 403 response if the user can't write to a blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="blockedBlogsFilter"></a>

## blockedBlogsFilter(req, res, next)
middleware sends a 403 response if the user access this blog.this may happen when the user already blocked this blog or if the blog blocked this user.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="privateBlog"></a>

## privateBlog(req, res, next)
middleware sends a 403 response if this blog is private and password wasn't provided.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="handleUploadedMedia"></a>

## handleUploadedMedia(req, res, next) ⇒ <code>void</code>
middleware that handles the uploaded media.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="protectAttributes"></a>

## protectAttributes(req, res, next) ⇒ <code>void</code>
middleware that handles the removes the protected attributes from req body.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="reblog"></a>

## reblog(req, res, next) ⇒ <code>void</code>
middleware that handles blog rebloging a post.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="create"></a>

## create(req, res, next)
middleware that creates a new post from request body..

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="update"></a>

## update(req, res, next)
middleware that updates a post from request body..

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="delete"></a>

## delete(req, res, next)
middleware that deletes a post.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="addIsFollowedToPostBlog"></a>

## addIsFollowedToPostBlog(posts, user) ⇒ <code>Array</code>
add is followed boolean to post blog

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| posts | <code>Array</code> | array of {Post} |
| user | <code>User</code> |  |

<a name="addIsLikedToPosts"></a>

## addIsLikedToPosts(posts, user) ⇒ <code>Array</code>
add liked boolean to post object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| posts | <code>Array</code> | array of {Post} |
| user | <code>User</code> |  |

<a name="findPost"></a>

## findPost(req, res, next) ⇒ <code>void</code>
get post by id

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getPostsAlias"></a>

## getPostsAlias(req, res, next) ⇒ <code>void</code>
alias route for searching the posts.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getPosts"></a>

## getPosts(req, res, next) ⇒ <code>void</code>
middleware that gets all posts published by a blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="draft"></a>

## draft(req, res, next) ⇒ <code>void</code>
middleware that gets all draft for a blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="ensureSafeCreation"></a>

## ensureSafeCreation(post) ⇒ <code>Object</code>
removes the post attributes that the user can't change

**Kind**: global function  
**Returns**: <code>Object</code> - post after deleting protected attributes.  

| Param | Type |
| --- | --- |
| post | <code>Object</code> | 

<a name="validateComment"></a>

## validateComment(comment) ⇒ <code>Boolean</code>
validates a comment on a post

**Kind**: global function  
**Returns**: <code>Boolean</code> - true if the comment is valid else false  

| Param | Type |
| --- | --- |
| comment | <code>String</code> | 

<a name="comment"></a>

## comment(req, res, next)
middleware to comment on a post

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="canDelete"></a>

## canDelete(comment, blog) ⇒ <code>Boolean</code>
check if a comment was successfully deleted

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if comment was deleted else throws an exception.  

| Param | Type |
| --- | --- |
| comment | <code>Object</code> | 
| blog | <code>ObjectId</code> | 

<a name="deleteComment"></a>

## deleteComment(req, res, next)
middleware to delete a comment

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="filterNotes"></a>

## filterNotes(notes, mode, before) ⇒ <code>Array</code>
filter post notes

**Kind**: global function  
**Returns**: <code>Array</code> - notes after being filtered  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | array of post notes |
| mode | <code>String</code> | required notes type |
| before | <code>Number</code> |  |

<a name="getNote"></a>

## getNote(req, res, next)
middleware to get notes on a post

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="createSubmissionPost"></a>

## createSubmissionPost(body, blogId, user) ⇒ <code>Object</code>
creates a post to be submitted to a blog

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | post body |
| blogId | <code>String</code> | id of the blog which submitted this post |
| user | <code>User</code> | the current user |

<a name="submitPost"></a>

## submitPost(req, res, next) ⇒ <code>void</code>
middleware that submits a post to a blog.requires the user to be logged in

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="submittedPosts"></a>

## submittedPosts(req, res, next) ⇒ <code>void</code>
middleware that returns all the submitted posts to a blog.requires the user to be the owner of this blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="deleteSubmittedPost"></a>

## deleteSubmittedPost(req, res, next) ⇒ <code>void</code>
middleware that deletes a submitted post.requires the user to be the owner of this blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="acceptSubmittedPost"></a>

## acceptSubmittedPost(req, res, next) ⇒ <code>void</code>
middleware that accepts a submitted post.requires the user to be the owner of this blog.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="retrieveTrendingPosts"></a>

## retrieveTrendingPosts(startIndex, query, userBlogs) ⇒ <code>Array</code>
function to retrieve the posts with the most number of comments, likes and reblogsthe function returns an array of trending posts

**Kind**: global function  

| Param | Type |
| --- | --- |
| startIndex | <code>int</code> | 
| query | <code>object</code> | 
| userBlogs | <code>array</code> | 

<a name="getTrendingPosts"></a>

## getTrendingPosts(req, res, next)
middleware returns an arrays for the tending posts

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="retrieveForYouPosts"></a>

## retrieveForYouPosts(startIndex, userBlogs) ⇒ <code>Array</code>
function to retrieve the random poststhe function returns an array of randomly selected posts

**Kind**: global function  

| Param | Type |
| --- | --- |
| startIndex | <code>int</code> | 
| userBlogs | <code>array</code> | 

<a name="getTrendingTextPosts"></a>

## getTrendingTextPosts(req, res, next)
middleware returns an arrays for the tending posts of type text ONLY

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getTrendingPhotoPosts"></a>

## getTrendingPhotoPosts(req, res, next)
middleware returns an arrays for the tending posts of type PHOTO only

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getTrendingVideoPosts"></a>

## getTrendingVideoPosts(req, res, next)
middleware returns an arrays for the tending posts of type VIDEO only

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getTrendingAskPosts"></a>

## getTrendingAskPosts(req, res, next)
middleware returns an arrays for the tending posts of type ASK only

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getTrendingAudioPosts"></a>

## getTrendingAudioPosts(req, res, next)
middleware returns an arrays for the tending posts of type AUDIO only

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="getPayloadFromGoogle"></a>

## getPayloadFromGoogle(idToken) ⇒ <code>Object</code>
This function is used to get user information from google using id_token

**Kind**: global function  
**Returns**: <code>Object</code> - payload of the user which is the information of the user  

| Param | Type | Description |
| --- | --- | --- |
| idToken | <code>String</code> | This is the token that google sends to the client |

<a name="createUserFromPayload"></a>

## createUserFromPayload(payload)
This function is used to create a new user in the database based on google information

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | of the user which is the information of the user |

<a name="SaveForgotPasswordToken"></a>

## SaveForgotPasswordToken(id) ⇒ <code>String</code>
This function is used to generate a token for the user and save it in redis

**Kind**: global function  
**Returns**: <code>String</code> - The token that is saved in redis  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | This is the user id in the database |

<a name="sendForgotPasswordEmail"></a>

## sendForgotPasswordEmail(id, email) ⇒ <code>String</code>
This function is used to generate a token for the user and mail it to them

**Kind**: global function  
**Returns**: <code>String</code> - The result of email sending process  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | This is the user's id in the database |
| email | <code>String</code> | This is the user's email |

<a name="SaveVerificationToken"></a>

## SaveVerificationToken(id) ⇒ <code>String</code>
This function is used to generate a token for the user and save it in redis

**Kind**: global function  
**Returns**: <code>String</code> - The token that is saved in redis  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | This is the user id in the database |

<a name="sendVerificationEmail"></a>

## sendVerificationEmail(id, email) ⇒ <code>String</code>
This function is used to generate a token for the user and mail it to them

**Kind**: global function  
**Returns**: <code>String</code> - The result of email sending process  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | This is the user's id in the database |
| email | <code>String</code> | This is the user's email |

<a name="sendNewPasswordEmail"></a>

## sendNewPasswordEmail(email, password) ⇒ <code>String</code>
This function is used to mail the new user's password it to them

**Kind**: global function  
**Returns**: <code>String</code> - The result of email sending process  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | This is the user's email |
| password | <code>String</code> | This is the user's new password |

<a name="userExists"></a>

## userExists(user) ⇒ <code>String</code>
This function checks if user exists in the database

**Kind**: global function  
**Returns**: <code>String</code> - Id id exists, Null if not  

| Param | Type |
| --- | --- |
| user | <code>UserObject</code> | 

<a name="primaryBlogExists"></a>

## primaryBlogExists(blog) ⇒ <code>Boolean</code>
This function checks if blog exists in the database

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if blog exists, False if not  

| Param | Type |
| --- | --- |
| blog | <code>BlogObject</code> | 

<a name="canCreateUser"></a>

## canCreateUser(user{username,) ⇒ <code>Boolean</code>
This function checks if user can be created such that it is unique in the database

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if user can be created, False if not  

| Param | Type | Description |
| --- | --- | --- |
| user{username, | <code>UserObject</code> | email} |

<a name="saveSettings"></a>

## saveSettings(data, id) ⇒ <code>Boolean</code>
This function updates user settings in the database based on the changed settings only

**Kind**: global function  
**Returns**: <code>Boolean</code> - 1 if user is updated, 0 if not  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The changed user settings |
| id | <code>String</code> | The user's id in the database |

<a name="setEmailVerified"></a>

## setEmailVerified(id)
This function updates user email verification status to true in the database

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The user's id in the database |

<a name="updatePasswordWithToken"></a>

## updatePasswordWithToken(id, password)
This function updates user's password in the database and delete the "forget password" token

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The user's id in the database |
| password | <code>String</code> | The user's new password |

<a name="updateUserPassword"></a>

## updateUserPassword(id, password)
This function hashes and updates user's password in the database

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The user's id in the database |
| password | <code>String</code> | The user's new password |

<a name="sendJWT"></a>

## sendJWT(req, res) ⇒ <code>Object</code>
This function sends users's info along with his JWT token in the response

**Kind**: global function  
**Returns**: <code>Object</code> - User's data  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>String</code> | The client's request |
| res | <code>String</code> | The server's response |

<a name="getPostsPerBlog"></a>

## getPostsPerBlog(user) ⇒ <code>Object</code>
This function calculates how many posts a user has in each blog

**Kind**: global function  
**Returns**: <code>Object</code> - The number of posts in each blog  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user's data |

<a name="getUserBlogs"></a>

## getUserBlogs(user) ⇒ <code>Object</code>
This function returns user's blogs info in details

**Kind**: global function  
**Returns**: <code>Object</code> - The user's blogs info  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user's data |

<a name="addIsLikedToPostsJSON"></a>

## addIsLikedToPostsJSON(posts, user) ⇒ <code>ArrayOfPosts</code>
This function adds a flag to posts if the user has liked it

**Kind**: global function  
**Returns**: <code>ArrayOfPosts</code> - The posts after adding like flag  

| Param | Type | Description |
| --- | --- | --- |
| posts | <code>ArrayOfPosts</code> | The posts to add flag to |
| user | <code>Object</code> | The user's data |

<a name="addTagFlagToPost"></a>

## addTagFlagToPost(posts, followingTags) ⇒ <code>ArrayOfPosts</code>
This function adds an array of tags to post if the user follows any of its tags

**Kind**: global function  
**Returns**: <code>ArrayOfPosts</code> - The posts after adding the array to  

| Param | Type | Description |
| --- | --- | --- |
| posts | <code>ArrayOfPosts</code> | The posts to add array to |
| followingTags | <code>Array</code> | The tags the user follows |

<a name="getPostsForUser"></a>

## getPostsForUser(blogs, followingTags, page, limit) ⇒ <code>ArrayOfPosts</code>
This function gets the posts of the blogs and tags the user follows based on his current page

**Kind**: global function  
**Returns**: <code>ArrayOfPosts</code> - The posts array  

| Param | Type | Description |
| --- | --- | --- |
| blogs | <code>ArrayOfBlogs</code> | The blogs the user follows |
| followingTags | <code>ArrayOfStrings</code> | The tags the user follows |
| page | <code>String</code> | The users current page (default is 1) |
| limit | <code>String</code> | The number of posts to return (default is 10) |

<a name="getUserFriends"></a>

## getUserFriends(user) ⇒ <code>ArrayOfUsers</code>
This function finds the other users who follows this user back

**Kind**: global function  
**Returns**: <code>ArrayOfUsers</code> - The user's who follow this user back  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user's data |

<a name="addFriendsToBlogs"></a>

## addFriendsToBlogs(user, blogs) ⇒ <code>ArrayOfBlogs</code>
This function adds a flag to blog is its owner is friend of the user

**Kind**: global function  
**Returns**: <code>ArrayOfBlogs</code> - The blogs after adding flag  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user's data |
| blogs | <code>Object</code> | The blogs to add flag to |

<a name="getTagsPhotosFromPostsWithTags"></a>

## getTagsPhotosFromPostsWithTags(postsWithTags) ⇒ <code>Object</code>
This extracts tags and photos from posts which has both

**Kind**: global function  
**Returns**: <code>Object</code> - Object of tags as key and photos as value  

| Param | Type | Description |
| --- | --- | --- |
| postsWithTags | <code>ArrayOfPosts</code> | Posts which has both tags and photos |

<a name="setNewPassword"></a>

## setNewPassword(email, password)
This function hashes and updates user's password in the database

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | The user's email in the database |
| password | <code>String</code> | The user's new password |

<a name="notifyUser"></a>

## notifyUser(userId, eventName, notificationBody) ⇒ <code>Response</code>
notify the user with {userId} with about {eventName}

**Kind**: global function  
**Returns**: <code>Response</code> - pusher response  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>ObjectId</code> \| <code>string</code> | the user id that you want to notify |
| eventName | <code>string</code> | the event name |
| notificationBody | <code>Object</code> \| <code>string</code> | notification body |

<a name="notifyBlog"></a>

## notifyBlog(blog, eventName, notificationBody) ⇒ <code>Response</code>
notify the blog owner about {eventName}

**Kind**: global function  
**Returns**: <code>Response</code> - pusher response  

| Param | Type | Description |
| --- | --- | --- |
| blog | <code>Blog</code> | the user id that you want to notify |
| eventName | <code>string</code> | the event name |
| notificationBody | <code>Object</code> \| <code>string</code> | notification body |

<a name="removeDuplicates"></a>

## removeDuplicates(stringArr) ⇒ <code>String</code>
**Kind**: global function  
**Returns**: <code>String</code> - a copy the array after removing all duplicate  

| Param | Type |
| --- | --- |
| stringArr | <code>Array</code> | 

