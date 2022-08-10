const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const errorHandler = require('./controllers/errorHandler');
const userRouter = require('./controllers/routers/userRoutes/user');
const postRouter = require('./controllers/routers/postRoutes/postRouter');
const notesRouter = require('./controllers/routers/postRoutes/notesRouter');
const blogPostRouter = require('./controllers/routers/postRoutes/BlogPosts');
const blogRouter = require('./controllers/routers/blogRoutes/blog');
const notificationRouter = require('./controllers/routers/notificationRoutes/notificationRouter');

const app = express();
app.use(
    cors({
        origin: 'https://tumblrx-app.herokuapp.com/',
        optionsSuccessStatus: 200, // For legacy browser support
    }),
);
// JSON Parser
app.use(express.json());
// URL Parser
app.use(express.urlencoded({
    extended: true,
}));

if (process.env.NODE_ENV === 'development') {
    // logger
    app.use(morgan('dev'));
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TumblrX API',
            version: '1.0.0',
            description: 'Rest API for TumblrX Website',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./controllers/routers/*.js', './controllers/routers/*/*.js', './models/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// TODO register all routers here
app.use('/api/user', userRouter);
app.use('/api/user/explore', require('./controllers/routers/userRoutes/trending'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/exploreText'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/exploreImage'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/exploreAudio'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/explorevideo'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/exploreAsk'));
app.use('/api/user/explore', require('./controllers/routers/userRoutes/forYou'));
app.use('/api/user/chat', require('./controllers/routers/chatRoutes/sendMessage'));
app.use('/api/user/chat', require('./controllers/routers/chatRoutes/reteriveChat'));
app.use('/api/user/chat', require('./controllers/routers/chatRoutes/reteriveConversations'));
app.use('/api/user/chat', require('./controllers/routers/chatRoutes/deleteChat'));
app.use('/api/post', postRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/post', notesRouter);
app.use('/api/blog', blogRouter);
app.use('/api/blog/explore', require('./controllers/routers/blogRoutes/trending'));
app.use('/api/blog/explore', require('./controllers/routers/blogRoutes/forYou'));
app.use('/api/blog', require('./controllers/routers/blogRoutes/reteriveSettings'));
app.use('/api/blog/:blogid/posts', blogPostRouter);
app.use('/api/blog', require('./controllers/routers/blogRoutes/CRUD'));

// generate fake data
// app.use('/fakeuser', require('./fakedata/user').fakedata);
// app.use('/fakeblog', require('./fakedata/blog').fakedata);


app.use(express.static(__dirname + '/emails'));
app.use('/docs', express.static('./views/fdocs'));
app.use('/uploads', express.static('./views/uploads'));
// Error Catching
app.all('*', errorHandler.handleUnfoundError);
app.use(errorHandler.handleErrors);
module.exports = app;

