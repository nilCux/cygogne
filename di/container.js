const awilix = require('awilix');

const { MongoModelDAO, MongoPromptTemplateDAO, MongoUserDAO } = require('../dao/daoMongoImpl');
const CreateTaskHandler = require('../handlers/taskHandlers/createTaskHandler')
// Create a container
const container = awilix.createContainer();

// Register your dependencies
container.register({
  modelDao: awilix.asClass(MongoModelDAO).singleton(),
  promptTemplateDao: awilix.asClass(MongoPromptTemplateDAO).singleton(),
  userDao: awilix.asClass(MongoUserDAO).singleton(),
  createTaskHandler: awilix.asClass(CreateTaskHandler).singleton()
});

module.exports = container;
