'use strict';

module.exports = ({ post, addPostValidation }) => async ({ title, author, image }) => {
  try {
    if (!addPostValidation({ title, author, image })) return new Error('Invalid input data');
    // Check if exists
    const postFind = await post.findByTitle({ title });
    if (postFind) return new Error('resource_already_exists');
    // Create if not
    const createdPost = await post.create({ title, author, image });
    return createdPost;
  } catch (error) {
    console.error(error);
    return error;
  }
};
