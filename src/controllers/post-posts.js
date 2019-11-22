'use strict';

module.exports = ({ addPosts }) => async ({ body }) => {
  const headers = {};
  try {
    const posts = await addPosts(body);
    if (posts instanceof Error) {
      if (posts.message === 'Invalid input data') return {
        headers,
        statusCode: 400,
        body: {
          code: posts.message,
          message: 'Invalid body data',
        },
      };
  
      if (posts.message === 'resource_already_exists') return {
        headers,
        statusCode: 409,
        body: {
          code: posts.message,
          message: 'Resource already exists. Please use other words for creation'
        },
      };
    }
    return {
      headers,
      statusCode: 201,
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
