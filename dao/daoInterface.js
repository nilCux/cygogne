class ModelDAO {
    async getModel(id) {
      throw new Error('Not implemented')
    }
  
    async saveModel(model) {
      throw new Error('Not implemented')
    }
  
    async deleteModel(id) {
        throw new Error('Not implemented')
    }

    async getAllModels() {
        throw new Error('Not implemented')
    }
  }
  
  class PromptTemplateDAO {
    async getPromptTemplate(id) {
      throw new Error('Not implemented')
    }
  
    async savePromptTemplate(promptTemplate) {
      throw new Error('Not implemented')
    }
  
    async deletePromptTemplate(id) {
        throw new Error('Not implemented')
    }

    async getAllPromptTemplates() {
        throw new Error('Not implemented')
    }
  }
  
  class UserDAO {
    async getUser(id) {
      throw new Error('Not implemented')
    }
  
    async saveUser(user) {
      throw new Error('Not implemented')
    }
  
    async deleteUser(id) {
        throw new Error('Not implemented')
    }

    async getAllUsers() {
        throw new Error('Not implemented')
    }
  }

  module.exports = { ModelDAO, PromptTemplateDAO, UserDAO }
  