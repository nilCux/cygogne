const BaseHandler = require('../baseHandler')
const serviceContainer = require('../../di/service_container')

class GetAllModelsHandler extends BaseHandler {
    async handle(request, context) {
        let responseBody = await serviceContainer.resolve("modelDao").getAllModels()
        return {body: JSON.stringify(responseBody)}
    }
}

module.exports = GetAllModelsHandler
