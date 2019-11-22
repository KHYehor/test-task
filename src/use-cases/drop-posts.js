'use strict';

module.exports = ({ post }) => async () => {
  try {
    const postDeleted = await post.dropDB();
    if (postDeleted instanceof Error) return new Error('unexpected error');
    return postDeleted;
  } catch (error) {
    console.error(error);
    return error;
  }
};
