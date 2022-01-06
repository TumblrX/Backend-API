/* eslint-disable max-len */
/**
 * @swagger
 *openapi: 3.0.0
 *info:
 *  title: TumblrX
 *  version: 1.0.0
 *servers:
 *  - url: http://{{x}}
 *paths:
 *  /api/user/register:
 *    post:
 *      tags:
 *        - User
 *      summary: Register
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                username: example
 *                email: example@mail.com
 *                password: thisIsMyPassword
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *                  symbol: '5'
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE
 *                  id: 61d0831f17e6173cbbc97b7f
 *                  name: example
 *                  email: example@mail.com
 *                  isEmailVerified: false
 *                  primary_blog: 61d0831f17e6173cbbc97b82
 *                  following: 0
 *                  followingTags: []
 *                  default_post_format: html
 *                  likes: 0
 *                  blogs:
 *                  - 61d0831f17e6173cbbc97b82
 *                  settings:
 *                    actionNotify: true
 *                    findMeByEmail: true
 *                    dashBoardInfiniteScrolling: true
 *                    hide_likes: false
 *                    hideFollowing: false
 *                    showTimestampOnPosts: false
 *                    messagingSounds: false
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: Blog Name Already Exists
 *                    symbol: 4
 *                  - status: Failed
 *                    message: Email Already Exists
 *                    symbol: 3
 *                  - status: Failed
 *                    message: Invalid Email
 *                    symbol: 2
 *                  - status: Failed
 *                    message: Invalid Password
 *                    symbol: 1
 *  /api/user/login:
 *    post:
 *      tags:
 *        - User
 *      summary: Login
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                email: example@example.com
 *                password: thisIsMyPassword
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE
 *                  id: 61d0831f17e6173cbbc97b7f
 *                  name: example
 *                  email: example@mail.com
 *                  isEmailVerified: false
 *                  primary_blog: 61d0831f17e6173cbbc97b82
 *                  following: 0
 *                  followingTags: []
 *                  default_post_format: html
 *                  likes: 0
 *                  blogs:
 *                  - 61d0831f17e6173cbbc97b82
 *                  settings:
 *                    actionNotify: true
 *                    findMeByEmail: true
 *                    dashBoardInfiniteScrolling: true
 *                    hide_likes: false
 *                    hideFollowing: false
 *                    showTimestampOnPosts: false
 *                    messagingSounds: false
 *        '400':
 *          description: Wrong Email or Password
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: fail
 *                  message: Wrong email or password
 *  /api/user/info:
 *    get:
 *      tags:
 *        - User
 *      summary: Info
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  id: 61d0831f17e6173cbbc97b7f
 *                  name: example
 *                  email: example@mail.com
 *                  isEmailVerified: false
 *                  primary_blog: 61d0831f17e6173cbbc97b82
 *                  following: 0
 *                  followingTags: []
 *                  default_post_format: html
 *                  likes: 0
 *                  blogs:
 *                  - 61d0831f17e6173cbbc97b82
 *                  settings:
 *                    actionNotify: true
 *                    findMeByEmail: true
 *                    dashBoardInfiniteScrolling: true
 *                    hide_likes: false
 *                    hideFollowing: false
 *                    showTimestampOnPosts: false
 *                    messagingSounds: false
 *  /api/user/dashboard:
 *    get:
 *      tags:
 *        - User
 *      summary: Dashboard
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *        - name: limit
 *          in: query
 *          schema:
 *            type: integer
 *          example: '10'
 *        - name: page
 *          in: query
 *          schema:
 *            type: integer
 *          example: '1'
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                 posts:
 *                 - _id: 61d03bd700ae81a6b41f29c1
 *                   blogAttribution:
 *                     _id: 61c85e37098fc37aeaf495b0
 *                     title: Taher Hello
 *                     handle: omaaar
 *                     owner: 61c85e37098fc37aeaf495ad
 *                     avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641036759103-61c85e37098fc37aeaf495b0.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: hello
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61d03bd700ae81a6b41f29c2
 *                   publishedOn: 1641036759
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61d03bd700ae81a6b41f29c1
 *                   liked: false
 *                 - _id: 61d0317200ae81a6b41f1e0d
 *                   blogAttribution:
 *                     _id: 61cb4fae645776915aa10a27
 *                     title: new fdgasdgd dgdsgasg fsbfgfs
 *                     handle: طاهرمحمد3925
 *                     owner: 61cb4fae645776915aa10a26
 *                     avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - text: vbb
 *                     type: text
 *                     formatting: []
 *                   postType: text
 *                   state: published
 *                   title: hello
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61d0317200ae81a6b41f1e0e
 *                   publishedOn: 1641034098
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61d0317200ae81a6b41f1e0d
 *                   liked: false
 *                 - _id: 61d0295200ae81a6b41f1ab0
 *                   blogAttribution:
 *                     _id: 61cb4fae645776915aa10a27
 *                     title: new fdgasdgd dgdsgasg fsbfgfs
 *                     handle: طاهرمحمد3925
 *                     owner: 61cb4fae645776915aa10a26
 *                     avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641032018054-61cb4fae645776915aa10a27.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: t\esty
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61d0295200ae81a6b41f1ab1
 *                   publishedOn: 1641032018
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61d0295200ae81a6b41f1ab0
 *                   liked: false
 *                 - _id: 61cfc079c02e1119b719a69e
 *                   blogAttribution:
 *                     _id: 61c85e37098fc37aeaf495b0
 *                     title: Taher Hello
 *                     handle: omaaar
 *                     owner: 61c85e37098fc37aeaf495ad
 *                     avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - text: fd
 *                     type: text
 *                     formatting: []
 *                   postType: text
 *                   state: published
 *                   title: dg
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfc079c02e1119b719a69f
 *                   publishedOn: 1641005177
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfc079c02e1119b719a69e
 *                   liked: false
 *                 - _id: 61cfbe31c02e1119b719a4ea
 *                   blogAttribution:
 *                     _id: 61c85e37098fc37aeaf495b0
 *                     title: Taher Hello
 *                     handle: omaaar
 *                     owner: 61c85e37098fc37aeaf495ad
 *                     avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641004593383-61c85e37098fc37aeaf495b0.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: test
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfbe31c02e1119b719a4eb
 *                   publishedOn: 1641004593
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfbe31c02e1119b719a4ea
 *                   liked: false
 *                 - _id: 61cfbb02c02e1119b719a374
 *                   blogAttribution:
 *                     _id: 61c85e37098fc37aeaf495b0
 *                     title: Taher Hello
 *                     handle: omaaar
 *                     owner: 61c85e37098fc37aeaf495ad
 *                     avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - text: dsgsdg
 *                     type: text
 *                     formatting: []
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641003778877-61c85e37098fc37aeaf495b0.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: buyb
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfbb02c02e1119b719a375
 *                   publishedOn: 1641003778
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfbb02c02e1119b719a374
 *                   liked: false
 *                 - _id: 61cfbae2c02e1119b719a344
 *                   blogAttribution:
 *                     _id: 61cb4fae645776915aa10a27
 *                     title: new fdgasdgd dgdsgasg fsbfgfs
 *                     handle: طاهرمحمد3925
 *                     owner: 61cb4fae645776915aa10a26
 *                     avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641003746675-61cb4fae645776915aa10a27.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: hello
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfbae2c02e1119b719a345
 *                   publishedOn: 1641003746
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfbae2c02e1119b719a344
 *                   liked: false
 *                 - _id: 61cfbac4c02e1119b719a2f8
 *                   blogAttribution:
 *                     _id: 61cb4fae645776915aa10a27
 *                     title: new fdgasdgd dgdsgasg fsbfgfs
 *                     handle: طاهرمحمد3925
 *                     owner: 61cb4fae645776915aa10a26
 *                     avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641003716237-61cb4fae645776915aa10a27.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: gsg
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfbac4c02e1119b719a2f9
 *                   publishedOn: 1641003716
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfbac4c02e1119b719a2f8
 *                   liked: false
 *                 - _id: 61cfbab1c02e1119b719a2ce
 *                   blogAttribution:
 *                     _id: 61cb4fae645776915aa10a27
 *                     title: new fdgasdgd dgdsgasg fsbfgfs
 *                     handle: طاهرمحمد3925
 *                     owner: 61cb4fae645776915aa10a26
 *                     avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - text: gdsgdsg
 *                     type: text
 *                     formatting: []
 *                   postType: text
 *                   state: published
 *                   title: gdsgs
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfbab1c02e1119b719a2cf
 *                   publishedOn: 1641003697
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfbab1c02e1119b719a2ce
 *                   liked: false
 *                 - _id: 61cfb93cc02e1119b719a072
 *                   blogAttribution:
 *                     _id: 61c85e37098fc37aeaf495b0
 *                     title: Taher Hello
 *                     handle: omaaar
 *                     owner: 61c85e37098fc37aeaf495ad
 *                     avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                     isAvatarCircle: true
 *                   content:
 *                   - media: image/png
 *                     url: http://tumblrx.me:3000/uploads/post/image/post-1641003324551-61c85e37098fc37aeaf495b0.png
 *                     altText: ''
 *                     type: image
 *                   postType: text
 *                   state: published
 *                   title: dvd
 *                   commentsCount: 0
 *                   likesCount: 0
 *                   reblogsCount: 0
 *                   trail: []
 *                   tags: []
 *                   notes: 61cfb93cc02e1119b719a073
 *                   publishedOn: 1641003324
 *                   __v: 0
 *                   notesCount: 0
 *                   isReblogged: false
 *                   id: 61cfb93cc02e1119b719a072
 *                   liked: false
 *  /api/user/settings-save:
 *    post:
 *      tags:
 *        - User
 *      summary: Settings Save
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                actionNotify: false
 *                findMeByEmail: false
 *                dashBoardInfiniteScrolling: false
 *                hide_likes: false
 *                hideFollowing: true
 *                showTimestampOnPosts: true
 *                messagingSounds: true
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *  /api/user/forgot-password:
 *    post:
 *      tags:
 *        - User
 *      summary: Forgot Password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                email: example@mail.com
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Success
 *                  message: Email sent successfully
 *        '500':
 *          description: Failed
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Success
 *                  message: Couldn't send email
 *  /api/user/get-blogs:
 *    get:
 *      tags:
 *        - User
 *      summary: Get Blogs
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - _id: 61b46c20bd13dd22af73bd04
 *                    title: Untitled
 *                    password: none
 *                    handle: example
 *                    isPrivate: false
 *                    isPrimary: true
 *                    description: my new blog
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    isAvatarCircle: true
 *                    headerImage: uploads/blog/blog-1640803849226-undefined.png
 *                  - _id: 61d07080f0ced759bb7b34ed
 *                    title: Untitled
 *                    password: none
 *                    handle: newww
 *                    isPrivate: false
 *                    isPrimary: false
 *                    description: my new blog
 *                    avatar: https://assets.tumblr.com/images/default_avatar/cube_open_128.png
 *                    isAvatarCircle: true
 *                    headerImage: uploads/blog/defaultHeader.png
 *  /api/user/verify-email:
 *    post:
 *      tags:
 *        - User
 *      summary: Verify Email
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                id: 61b4762ccf964ecf33bbfeed
 *                token: >-
 *                  E49dYo7VzXlkdrFRaY0E4lnOUVFIdZewjrmkvJMIUodPGcWvJOQj2K1pZfGDBg0A
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Success
 *                  message: Email Verified
 *        '401':
 *          description: Failed
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Failed
 *                  message: Invalid Token
 *  /api/user/change-password:
 *    post:
 *      tags:
 *        - User
 *      summary: Change Password
 *      description: '**Token and ID** are used only if this password change is done by email'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                token: >-
 *                  6sW1naz7KnfOZ2u021bI4vFB6A8tI3VKVnWqsvLOcPPlLVv6uMbp9N4tSyzZrbUj
 *                id: 61b488fa7ddee386e724e765
 *                oldPassword: 6MXGP6ykO0
 *                password: example
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Success
 *                  message: Password Changed
 *        '401':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: User Doesn't Exist
 *                  - status: Failed
 *                    message: Invalid New Password
 *                  - status: Failed
 *                    message: Wrong Old Password
 *                  - status: Failed
 *                    message: Invalid Token
 *  /api/user/change-email:
 *    post:
 *      tags:
 *        - User
 *      summary: Change Email
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                email: example@gmail.com
 *                password: example
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: Success
 *        '401':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: Email Already Exists
 *                  - status: Failed
 *                    message: Wrong Password
 *  /api/user/navbar:
 *    get:
 *      tags:
 *        - User
 *      summary: NavBar
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  postsCount:
 *                    61b46c20bd13dd22af73bd04: 23
 *                  followingCount: 10
 *                  likesCount: 3
 *  /api/user/following:
 *    get:
 *      tags:
 *        - User
 *      summary: following
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  numberOfFollowing: 10
 *                  followingBlogs:
 *                  - _id: 61b396f37692513272c78f63
 *                    title: Untitled
 *                    handle: george8
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c24e9a6b827a7e14446186
 *                    title: Untitled
 *                    handle: pizza
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c2e9a17d5712f8ff2c738c
 *                    title: ahmed1234
 *                    handle: testblog123456
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c2eaee7d5712f8ff2c73c2
 *                    title: fdswase
 *                    handle: ahmed111
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c2ecbc7d5712f8ff2c73ce
 *                    title: testyalla
 *                    handle: bishoy315
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c303b492a50ed72e0efb68
 *                    title: Untitled
 *                    handle: Taherrr
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61c85e37098fc37aeaf495b0
 *                    title: Taher Hello
 *                    handle: omaaar
 *                    avatar: uploads/blog/blog-1641005373799-61c85e37098fc37aeaf495b0.jpeg
 *                    friends: false
 *                  - _id: 61cb18dea28160c441a8a572
 *                    title: Untitled
 *                    handle: fdsbegnrns
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61cb19cba28160c441a8bbdf
 *                    title: Untitled
 *                    handle: bfdbdfsbdfnds
 *                    avatar: uploads/blog/blog-1640803918661-undefined.png
 *                    friends: false
 *                  - _id: 61cb4fae645776915aa10a27
 *                    title: new fdgasdgd dgdsgasg fsbfgfs
 *                    handle: طاهرمحمد3925
 *                    avatar: uploads/blog/blog-1640854821702-61cb4fae645776915aa10a27.jpeg
 *                    friends: false
 *  /api/user/follow-tag:
 *    post:
 *      tags:
 *        - User
 *      summary: Follow Tag
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                tag: coding
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *                  message: Tag is followed
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: You're already following this tag
 *                  - status: Failed
 *                    message: Please enter a tag to follow
 *  /api/user/unfollow-tag:
 *    post:
 *      tags:
 *        - User
 *      summary: unFollow Tag
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                tag: coding
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *                  message: Tag is unfollowed
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: You're not following this tag
 *                  - status: Failed
 *                    message: Please enter a tag to follow
 *  /api/user/get-tags:
 *    get:
 *      tags:
 *        - User
 *      summary: Get Tags
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          schema:
 *            type: string
 *          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  tagsPhotos:
 *                    art:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1639320914431-61b22d3a0b8aaec60c5af1af.jpeg
 *                    - https://media0.giphy.com/media/n5zvfvd05VDO/giphy.webp?cid=94c17816fjhfqjvza1767z84gykjywu5tok6ezcrqxfqq58g&rid=giphy.webp&ct=g
 *                    anime:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640700863634-61b46c20bd13dd22af73bd04.png
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701001970-61b46c20bd13dd22af73bd04.jpeg
 *                    cars:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701034609-61b46c20bd13dd22af73bd04.jpeg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701050824-61b46c20bd13dd22af73bd04.jpeg
 *                    coding:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701074643-61b46c20bd13dd22af73bd04.jpeg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701088583-61b46c20bd13dd22af73bd04.jpeg
 *                    Egypt:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701105531-61b46c20bd13dd22af73bd04.jpeg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701119909-61b46c20bd13dd22af73bd04.jpeg
 *                    gaming:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701136911-61b46c20bd13dd22af73bd04.jpeg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701147394-61b46c20bd13dd22af73bd04.jpeg
 *                    math:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701192821-61b46c20bd13dd22af73bd04.jpeg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640701217683-61b46c20bd13dd22af73bd04.jpeg
 *                    "#meme":
 *                    - https://giphy.com/gifs/sherlockgnomes-sherlock-l4pTfx2qLszoacZRS
 *                    - https://giphy.com/gifs/lfc-football-soccer-xUA7b7eHmShdVRyvQc
 *                    "#heyhey":
 *                    - https://giphy.com/gifs/bucks-milwaukee-bucks-nba-finals-CvxQBnh6Vuu8zNbOG5
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640742612755-61cb4c4ec8106aff9ae647c4.jpg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640742613296-61cb4c4ec8106aff9ae647c4.jpg
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640742614434-61cb4c4ec8106aff9ae647c4.jpg
 *                    sad:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640829631099-61cd122b49f9799c4aec13cb.gif
 *                    a:
 *                    - https://media1.giphy.com/media/sb1cZauzVkfjq/giphy.webp?cid=94c17816q8p1gd5sv9eaz0okyw4w83udhu65fq3dgko234cg&rid=giphy.webp&ct=s
 *                    football:
 *                    - https://media1.giphy.com/media/dAfieBBpL9nBqmNsXn/giphy.webp?cid=94c178163wvmkwo8ol1iqw8gp6eggl4elyv60y7l4wvazrxv&rid=giphy.webp&ct=g
 *                    Image_post:
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1640979973304-61bcadaebc7b450b8a387125.jpeg
 *                    "#example1":
 *                    - https://giphy.com/gifs/helloall-new-year-years-nye-d03tvRxmFBJ8xcKqrk
 *                    - http://tumblrx.me:3000/uploads/post/image/post-1641006986360-61c1e3b86b827a7e144458f9.jpg
 *  /api/user/redirect:
 *    post:
 *      tags:
 *        - User
 *      summary: redirect
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                id_token: 934820398450193839iroejfijfeow9ir90q34ir9
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  status: success
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwODMxZjE3ZTYxNzNjYmJjOTdiN2YiLCJwcmltYXJ5QmxvZyI6IjYxZDA4MzFmMTdlNjE3M2NiYmM5N2I4MiIsImlhdCI6MTY0MTA1NTAwN30.mcDZCxjCWftLbyfZh6mOrX-5dgJ9d9ISOnBEL9lCtaE
 *                  id: 61d0831f17e6173cbbc97b7f
 *                  name: example
 *                  email: example@mail.com
 *                  isEmailVerified: false
 *                  primary_blog: 61d0831f17e6173cbbc97b82
 *                  following: 0
 *                  followingTags: []
 *                  default_post_format: html
 *                  likes: 0
 *                  blogs:
 *                  - 61d0831f17e6173cbbc97b82
 *                  settings:
 *                    actionNotify: true
 *                    findMeByEmail: true
 *                    dashBoardInfiniteScrolling: true
 *                    hide_likes: false
 *                    hideFollowing: false
 *                    showTimestampOnPosts: false
 *                    messagingSounds: false
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                example:
 *                  - status: Failed
 *                    message: Invalid token
 */
/**
* @swagger
* /api/user/follow:
*  post:
*    tags:
*      - User
*    summary: follow
*    requestBody:
*      content:
*        application/json:
*          schema:
*            type: object
*            example:
*              _id: george
*    parameters:
*      - name: Authorization
*        in: header
*        schema:
*          type: string
*        example: >-
*          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjYzIzYzcwZjkzMjgyZjNhYWM5MWQiLCJwcmltYXJ5QmxvZyI6IjYxY2NjMjNjNzBmOTMyODJmM2FhYzkyMCIsImlhdCI6MTY0MTA0ODYwNn0.CCKdc0pyLiI3r_bqCctlddgOHe_2LaFdxWf3a3UJjw4
*    responses:
*      '200':
*        description: Successful response
*        content:
*          application/json:
*            example:
*              message: you started following coolBlog
* /api/user/unfollow:
*  delete:
*    tags:
*      - User
*    summary: unfollow
*    parameters:
*      - name: Authorization
*        in: header
*        schema:
*          type: string
*        example: >-
*          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM1MDhkZDY5YjAwMGNmMmQ1YzI1YjAiLCJwcmltYXJ5QmxvZyI6IjYxYzUwOGRkNjliMDAwY2YyZDVjMjViMyIsImlhdCI6MTY0MDQ0MDM1OX0.x64d5Jbm4xhxoUocOSIO1Vq-LmD_gY7ynKP6O7SPn8g
*    responses:
*      '200':
*        description: Successful response
*        content:
*          application/json:
*            example:
*              message: you unfollowed coolBlog
*/
