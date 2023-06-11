const awilix = require('awilix');

const serviceContainer = awilix.createContainer();

const MockModelDAO = require('../dao/daoMockImpl');

serviceContainer.register({
  modelDao: awilix.asClass(MockModelDAO).singleton(),
});

module.exports = serviceContainer
