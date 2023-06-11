const BaseHandler = require('../baseHandler');
const serviceContainer = require('../../di/service_container')

class GetAllModelsHandler extends BaseHandler {
    async handle(request, context) {
        return await serviceContainer.resolve("modelDao").getAllModels()
    }
}

module.exports = GetAllModelsHandler
