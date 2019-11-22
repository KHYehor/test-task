'use strict';

module.exports = ({ makeDB }) => ({
  findOrCreate: async ({ src }) => {
    try {
      const db = await makeDB();
      const file = db.collection('file');
      let data = await file.findOne({ src });
      if (!data) data = await file.insertOne({ 
        src,
        updated: Date.parse(new Date()), 
        created: Date.parse(new Date()),
      });
      return data.ops ? data.ops[0] : data;
    } catch (error) {
      console.error(error);
      return error; 
    }
  },
});
