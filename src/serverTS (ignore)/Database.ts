const mongoose = require("mongoose");


export class Database {

    private MongoClient = mongoose;
    private uri = "'mongodb://localhost:27017/shelf'";
    private client;
    private collectionName: string;
    private dbName: string = "emery";

    constructor(collectionName) {

        this.collectionName = collectionName;
        this.client = new this.MongoClient.connect(this.uri, { useNewUrlParser: true })
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.error('Could not connect to MongoDB..', err));

 
    }

  
}
