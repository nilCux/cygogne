import './dbServiceInterface';

class MongoDBService extends DBServiceInterface {
    async init() {
        // Initialize the database connection
        this.db_connection = await MongoClient.connect(process.env.MONGODB_URI);
        // Initialize the DAO
        this.Modeldao = new MongoDBModelDAO(this.db_connection.db());
        this.Promptdao = new MongoDBPromptTemplateDAO(this.db_connection.db());
        this.Userdao = new MongoDBUserDAO(this.db_connection.db());
    }

    async close() {
        // Close the database connection
        this.db_connection.close();
    }
}