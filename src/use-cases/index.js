'use strict';

const { post } = require('../models');
const makeAddPosts = require('./add-post');
const makeListPosts = require('./list-posts');
const makeDropPosts = require('./drop-posts');

const { addPostValidation, listPostsValidation } = require('../validation');

const addPosts = makeAddPosts({ post, addPostValidation });
const listPosts = makeListPosts({ post, listPostsValidation });
const dropPosts = makeDropPosts({ post });

module.exports = { addPosts, listPosts, dropPosts };
