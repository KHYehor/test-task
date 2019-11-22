'use strict';

const makeGetPosts = require('./get-posts');
const makePostPosts = require('./post-posts');
const makeDeletePosts = require('./delete-posts');
const { addPosts, listPosts, dropPosts } = require('../use-cases');

const getPosts = makeGetPosts({ listPosts });
const postPosts = makePostPosts({ addPosts });
const deletePosts = makeDeletePosts({ dropPosts });

module.exports = { getPosts, postPosts, deletePosts };
