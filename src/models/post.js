'use strict';

const { ObjectID } = require('mongodb');

module.exports = ({ makeDB, file }) => ({
  findById: async ({ startingAfter, endingBefore, limit }) => {
    try {
      const db = await makeDB();
      const post = db.collection('post');
      const query = { _id: { $exists: true } };
      if (startingAfter) query._id['$gt'] = new ObjectID(startingAfter);
      if (endingBefore) query._id['$lte'] = new ObjectID(endingBefore);
      const queryLimit = (limit ? parseInt(limit) : 20) + 1;
      const cursor = await post.aggregate([
        { '$match': query },
        { '$limit': queryLimit },
        { '$lookup': {
          from: 'file',
          localField: 'image',
          foreignField: '_id',
          as: 'image',
        } },
        { $project:
          { 
            image: { $arrayElemAt: [ '$image', 0 ] },
            title: 1,
            author: 1,
            updated: 1,
            created: 1,
            isActive: 1, 
          } 
        }
      ]);

      const data = await cursor.toArray();
      const hasMore = !!endingBefore || data.length === queryLimit;
      if (hasMore) data.pop();
      return { hasMore, data };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  create: async ({ title, author, image }) => {
    try {
      const db = await makeDB();
      const post = db.collection('post');
      const filedoc = await file.findOrCreate({ src: image.src });
      const data = await post.insertOne({ 
        title, 
        author,
        image: filedoc._id, 
        updated: Date.parse(new Date()),
        created: Date.parse(new Date()),
        isActive: true 
      });
      // Changing id to the whole file
      data.ops[0].image = filedoc;
      return data.ops[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findByTitle: async ({ title }) => {
    try {
      const db = await makeDB();
      const post = db.collection('post');
      const data = await post.findOne({ title });
      return data ? [data] : null;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  dropDB: async () => {
    try {
      const db = await makeDB();
      await db.dropCollection('file');
      await db.dropCollection('post');
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
});
