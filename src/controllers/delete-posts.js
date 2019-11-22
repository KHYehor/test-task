'use strict';

module.exports = ({ dropPosts }) => async ()  => {
  try {
    const headers = {};
    const dropped = await dropPosts();
    if (dropped instanceof Error) return {
      headers,
      statusCode: 400,
      body: {
        code: 'Unexpected error',
        message: 'Unexpected exception dropping db',
      }
    };
    return {
      headers,
      statusCode: 200,
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