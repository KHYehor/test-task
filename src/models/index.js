'use strict';

const mongodb = require('mongodb');

const makeFile = require('./file');
const makePost = require('./post');

const MongoClient = mongodb.MongoClient;
const url = process.env.DM_COMMENTS_DB_URL;
const dbName = process.env.DM_COMMENTS_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const makeDB = async () => {
  if (!client.isConnected()) {
    await client.connect();
    await client.db(dbName).createCollection('post');
    await client.db(dbName).createCollection('file');
  }
  return client.db(dbName);
}

const file = makeFile({ makeDB });
// I am not sure if one model can use another
const post = makePost({ makeDB, file });

module.exports = { file, post };
