## Test assignment
### Seedium

#### Getting started

1. Check all requirements from this file. Then check [API requirements](https://app.swaggerhub.com/apis/Seedium/Test-Assignment/1.0.0)
1. Clone the repository
1. Create branch from master with name `test-<email>`. Please specify email on that we have send invite
1. You will start from `src/` folder. All your written code will be there.
1. You can use any nodejs framework that supports by "chai-http" module (Express, Koa, Fastify and etc). Or write on the pure http module. It's only up to you.
1. Open file `src/index.js`. Your entry point will be here and export by default you app instance. (It's instance will be used in tests).
1. After finishing a work, please run `npm test` command and check that all tests are passed.
1. Then in GitLab create new "Merge Request" where source branch it will be you `test-<email>` branch and target will be `master` branch. Title of merge request set `Test work: <email>`. In `Assignee` field please set our developer `@kostyazgara`, then submit merge request.

#### What we expect

1. Using MongoDB as main database.
1. Good project structure. Separate controllers, services, data layer
1. Validation requests and responses.
1. Implementation of cursor pagination
1. All tests should be passed
1. Properly handled errors

#### Will be a plus

1. Use typescript
1. Use pure mongodb drive, without any ODM like Mongoose

#### Before start

1. `image` should be a separate collection
1. Do not touch files with tests, expect one thing
    1. For properly test going you should complete 2 functions - `createPosts` and `removePosts`. Please, use comments near there functions for understanding how it should work
1. Feel free to organize your application structure as you want.
1. Feel free to use any libs from npm.

#### Estimations

1. Project and tasks understanding - **30 minutes**
1. Project set up (clone repository, install dependencies) - **30 minutes**
1. Build models and schemas - **1 hour**
1. Develop controllers - **2 hour**
1. Develop validation - **1 hour**
1. Develop business logic (services for processing main functionality, such as get posts, create posts and etc) - **3 hours**
1. Test passing - **1 hours**
1. Refactoring - **1 hour**

Total time to accomplishing test assignment - **10 hours**.
If you feeling that writing tests taking more time that estimated, please don't spend more time and send us everything that is ready!

For additional questions, please don't hesitate to contact with me [k.zgara@seedium.io](mailto:k.zgara@seedium.io) (Kostya Zgara, developer of Seedium)
