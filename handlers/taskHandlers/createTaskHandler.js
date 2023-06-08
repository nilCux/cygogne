const BaseHandler = require('../baseHandler');
console.log(BaseHandler);

class CreateTaskHandler extends BaseHandler {
    handle(request, context) {
        // For each model or different prompts, we need to load suggested Lora, Embedding and parameters
        console.log(request)
        
    }
}

module.exports = CreateTaskHandler