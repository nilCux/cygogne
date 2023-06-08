class BaseHandler {
    handle(resuest, context) {
      throw new Error('handle method not implemented');
    }
}

module.exports = BaseHandler
