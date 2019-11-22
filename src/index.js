'use strict';

process.env.DM_COMMENTS_DB_URL = 'mongodb://127.0.0.1:27017';
process.env.DM_COMMENTS_DB_NAME = 'Posts';

const { getPosts, postPosts, deletePosts } = require('./controllers');
const callback = require('./express-callback');

const express = require('express');
const app = express();

app.use(express.json());
app.get('/posts', callback(getPosts));
app.post('/posts', callback(postPosts));
app.delete('/posts', callback(deletePosts));

app.listen(8080, () => console.log('Server started...'));

module.exports = app;
