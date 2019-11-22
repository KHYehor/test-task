'use strict';

module.exports = ({ post, listPostsValidation }) => async ({ startingAfter, endingBefore, limit }) => {
  if (!listPostsValidation({ startingAfter, endingBefore, limit })) return new Error('Invalid input data');
  try {
    const listPosts = await post.findById({ startingAfter, endingBefore, limit });
    return listPosts;
  } catch (error) {
    console.error(error);
    return error;
  }
};
