const awilix = require('awilix');
const container = awilix.createContainer();

const CreateTaskHandler = require('../handlers/taskHandlers/createTaskHandler');
const GetAllModelsHandler = require('../handlers/modelHandlers/getAllModelsHandler');
const GetOneModelHandler = require('../handlers/modelHandlers/getOneModelHandler')

container.register({
  createTaskHandler: awilix.asClass(CreateTaskHandler).singleton(),
  getAllModelsHandler: awilix.asClass(GetAllModelsHandler).singleton(),
  getOneModelHandler: awilix.asClass(GetOneModelHandler).singleton()
});

module.exports = container
