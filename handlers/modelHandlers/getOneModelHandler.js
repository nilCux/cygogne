const BaseHandler = require('../baseHandler')
const serviceContainer = require('../../di/service_container')

class GetOneModelHandler extends BaseHandler {
    async handle(id) {
        let responseBody = await serviceContainer.resolve("modelDao").getModel(id)
        return {body: JSON.stringify(responseBody)}
    }
}

module.exports = GetOneModelHandler
