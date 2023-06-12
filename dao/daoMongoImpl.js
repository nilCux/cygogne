const { ModelDAO, PromptTemplateDAO, UserDAO } = require('./daoInterface')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err))

const modelSchema = new mongoose.Schema({}, { strict: false, collection: 'models' })
const promptTemplateSchema = new mongoose.Schema({}, { strict: false, collection: 'promptTemplates' })
const userSchema = new mongoose.Schema({}, { strict: false, collection: 'users' })

const Model = mongoose.model('Model', modelSchema)
const PromptTemplate = mongoose.model('PromptTemplate', promptTemplateSchema)
const User = mongoose.model('User', userSchema)

class MongoModelDAO extends ModelDAO {
    async getModel(id) {
        return await Model.findOne({ id })
    }

    async saveModel(model) {
        return await Model.updateOne({ id: model.id }, model, { upsert: true })
    }

    async deleteModel(id) {
        return await Model.deleteOne({ id })
    }

    async getAllModels() {
        return await Model.find({})
    }
}

class MongoPromptTemplateDAO extends PromptTemplateDAO {
    async getPromptTemplate(id) {
        return await PromptTemplate.findOne({ id })
    }

    async savePromptTemplate(promptTemplate) {
        return await PromptTemplate.updateOne({ id: promptTemplate.id }, promptTemplate, { upsert: true })
    }

    async deletePromptTemplate(id) {
        return await PromptTemplate.deleteOne({ id })
    }

    async getAllPromptTemplates() {
        return await PromptTemplate.find({})
    }
}

class MongoUserDAO extends UserDAO {
    async getUser(id) {
        return await User.findOne({ id })
    }

    async saveUser(user) {
        return await User.updateOne({ id: user.id }, user, { upsert: true })
    }

    async deleteUser(id) {
        return await User.deleteOne({ id })
    }

    async getAllUsers() {
        return await User.find({})
    }
}

module.exports = { MongoModelDAO, MongoPromptTemplateDAO, MongoUserDAO }
