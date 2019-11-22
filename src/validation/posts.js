'use strict';

const { ObjectID } = require('mongodb');

module.exports = {
  addPostValidation: ({ title, author, image }) => {
    const checkTitle = title && typeof title === 'string';
    const checkAuthor = author && typeof author === 'string';
    const checkImage = image.src && typeof image.src === 'string';
    if (checkTitle && checkAuthor && checkImage) return true;
    return false;
  },
  listPostsValidation: ({ startingAfter, endingBefore, limit }) => {
    const isStartingAfter = startingAfter ? ObjectID.isValid(startingAfter) : true;
    const isEndingBefore = endingBefore ? ObjectID.isValid(endingBefore) : true;
    const isLimit = limit ? !isNaN(limit) : true;
    if (isStartingAfter && isEndingBefore && isLimit) return true;
    return false;
  }
};
