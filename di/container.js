const awilix = require('awilix')
const container = awilix.createContainer()

const CreateT2ITaskHandler = require('../handlers/taskHandlers/createT2ITaskHandler')
const GetAllModelsHandler = require('../handlers/modelHandlers/getAllModelsHandler')
const GetOneModelHandler = require('../handlers/modelHandlers/getOneModelHandler')

container.register({
  createT2ITaskHandler: awilix.asClass(CreateT2ITaskHandler).singleton(),
  getAllModelsHandler: awilix.asClass(GetAllModelsHandler).singleton(),
  getOneModelHandler: awilix.asClass(GetOneModelHandler).singleton()
})

module.exports = container
