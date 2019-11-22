const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/index');

chai.use(chaiHttp);
const expect = chai.expect;

const removePosts = async () => {
  // TODO Please clear your database records here
  await chai.request(app).delete('/posts')
};

const post1 = {
  title: 'Jack London1',
  author: 'Jon',
  image: {
    src: 'https://cdn.example.com/files/logo.png',
  },
};

const post2 = {
  title: 'Jack London2',
  author: 'Jon',
  image: {
    src: 'https://cdn.example.com/files/logo.png',
  },
};

const post3 = {
  title: 'Jack London3',
  author: 'Jon',
  image: {
    src: 'https://cdn.example.com/files/logo.png',
  },
};

const post4 = {
  title: 'Jack London4',
  author: 'Jon',
  image: {
    src: 'https://cdn.example.com/files/logo.png',
  },
};

const posts = [post1, post2, post3, post4];

const createPosts = async (numberOfPostsToCreate = 2) => {
  // TODO Please, create test posts here and return result as array of posts
  const result = [];
  for (let i = 0; i < numberOfPostsToCreate; i++) {
    const response = await chai
      .request(app)
      .post('/posts')
      .send(posts[i]);
    result.push(response.body);
  };
  return result;
};

describe('Post', () => {
  let createdPosts = [];

  before(async () => {
    // TODO please pass desired count to create posts
    createdPosts = await createPosts(4);
  });

  after(async () => {
    await removePosts();
  });

  describe('Get List', () => {

    it('should get list of posts', async () => {
      const response = await chai
        .request(app)
        .get('/posts');

      expect(response).status(200);
      expect(response.body).property('hasMore');
      expect(response.body).property('data').an('array').length(createdPosts.length);

      if (createdPosts.length > 0) {
        // get first post for inspection
        const [post] = response.body.data;

        expect(post).an('object').property('_id');
        expect(post).property('title');
        expect(post).property('author');
        expect(post).property('image').property('_id');
        expect(post).property('image').property('src');
        expect(post).property('image').property('created');
        expect(post).property('created');
      }
    });

    it('should start after specific position', async () => {
      expect(createdPosts.length).gt(2, `Please create posts more than 1`);
      const response = await chai
        .request(app)
        .get('/posts')
        .query({
          startingAfter: createdPosts[0]._id,
        });

      expect(response).status(200);
      expect(response.body).property('data').length(createdPosts.length - 1);

      const [ post ] = response.body.data;
      expect(post).property('_id').not.eq(createdPosts[0]._id.toString());
    });

    it('should ending before specific position', async () => {
      expect(createdPosts.length).gt(2, `Please create posts more than 1`);

      const response = await chai
        .request(app)
        .get('/posts')
        .query({
          endingBefore: createdPosts[1]._id,
        });
      expect(response).status(200);
      expect(response.body).property('data').length(1);
      // I was talking about this one
      expect(response.body).property('hasMore').eq(true);

      const [ post ] = response.body.data;
      expect(post).property('_id').eq(createdPosts[0]._id.toString());
    });

    it('hasMore property should be true in get previous', async () => {
      expect(createdPosts.length).gt(3, `Please create posts more than 2`);

      const response = await chai
        .request(app)
        .get('/posts')
        .query({
          endingBefore: createdPosts[2]._id,
          limit: 1,
        });

      expect(response).status(200);
      expect(response.body).property('hasMore').eq(true);
    });

    it('hasMore property should be true in get next', async () => {
      expect(createdPosts.length).gt(3, `Please create posts more than 2`);

      const response = await chai
        .request(app)
        .get('/posts')
        .query({
          startingAfter: createdPosts[0]._id,
          limit: 1,
        });

      expect(response).status(200);
      expect(response.body).property('hasMore').eq(true);
    });

    it('should limit your posts per page in response', async () => {
      expect(createdPosts.length).gt(2, `Please create posts more than 1`);

      const response = await chai
        .request(app)
        .get('/posts')
        .query({
          limit: 1,
        });

      expect(response).status(200);
      expect(response.body).property('data').an('array').length(1);
    });
  });

  describe('Create Post', () => {
    const postPaylod = {
      title: 'Widget Adapter',
      author: 'Test User',
      image: {
        src: 'https://cdn.example.com/files/logo.png',
      },
    };

    it('should create post', async () => {
      const response = await chai
        .request(app)
        .post('/posts')
        .send(postPaylod);

      expect(response).status(201);
      expect(response.body).property('_id');
      expect(response.body).property('title').eq(postPaylod.title);
      expect(response.body).property('author').eq(postPaylod.author);
      expect(response.body).property('image').property('_id');
      expect(response.body).property('image').property('src').eq(postPaylod.image.src);
      expect(response.body).property('isActive').eq(true);
      expect(response.body).not.property('securityProperty');
    });

    it('should not create post if title missing', async () => {
      const payload = {
        ...postPaylod,
        title: undefined,
      };

      const response = await chai
        .request(app)
        .post('/posts')
        .send(payload);

      expect(response).status(400);
      expect(response.body).property('code');
      expect(response.body).property('message');
    });

  });

});
