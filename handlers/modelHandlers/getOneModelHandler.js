const BaseHandler = require('../baseHandler');
const serviceContainer = require('../../di/service_container')

class GetOneModelHandler extends BaseHandler {
    async handle(id) {
        return await serviceContainer.resolve("modelDao").getModel(id)
    }
}

module.exports = GetOneModelHandler
