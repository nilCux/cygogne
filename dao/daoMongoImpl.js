const { MongoClient } = require('mongodb');

class MongoDBModelDAO extends ModelDAO {
    constructor(db) {
        super();
        this.collection = db.collection('models');
    }

    async getModel(id) {
        return await this.collection.findOne({ id });
    }

    async saveModel(model) {
        const { result } = await this.collection.updateOne({ id: model.id }, { $set: model }, { upsert: true });
        return result.ok === 1;
    }

    async deleteModel(id) {
        const { result } = await this.collection.deleteOne({ id });
        return result.ok === 1;
    }

    async getAllModels() {
        return await this.collection.find({}).toArray();
    }
}

class MongoDBPromptTemplateDAO extends PromptTemplateDAO {
    constructor(db) {
        super();
        this.collection = db.collection('promptTemplates');
    }

    async getPromptTemplate(id) {
        return await this.collection.findOne({ id });
    }

    async savePromptTemplate(promptTemplate) {
        const { result } = await this.collection.updateOne({ id: promptTemplate.id }, { $set: promptTemplate }, { upsert: true });
        return result.ok === 1;
    }

    async deletePromptTemplate(id) {
        const { result } = await this.collection.deleteOne({ id });
        return result.ok === 1;
    }

    async getAllPromptTemplates() {
        return await this.collection.find({}).toArray();
    }
}

class MongoDBUserDAO extends UserDAO{
    constructor(db) {
        super();
        this.collection = db.collection('users');
    }

    async getUser(id) {
        return await this.collection.findOne({ id });
    }

    async saveUser(user) {
        const { result } = await this.collection.updateOne({ id: user.id }, { $set: user }, { upsert: true });
        return result.ok === 1;
    }

    async deleteUser(id) {
        const { result } = await this.collection.deleteOne({ id });
        return result.ok === 1;
    }

    async getAllUsers() {
        return await this.collection.find({}).toArray();
    }
}
