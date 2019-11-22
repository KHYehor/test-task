'use strict';

module.exports = ({ listPosts }) => async ({ query })  => {
  try {
    const headers = {};
    const posts = await listPosts(query);
    if (posts instanceof Error) {
      if (posts.message === 'Invalid input data') return {
        headers,
        statusCode: 400,
        body: {
          code: 'Invalid input data',
          message: 'Invalid query data',
        }
      };
    }
    return {
      headers,
      statusCode: 200,
      body: posts,
    };
  } catch (error) {
    console.error(error);
    return {
      headers,
      statusCode: 500,
      body: { code: error.message },
    };
  }
};
