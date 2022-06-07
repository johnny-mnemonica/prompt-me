const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const data = require('./data');

const batchImport = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db('promptme');
    
    console.log(data);
    await db.collection("posts").insertMany(data.data);
    
    client.close();
    
    }
    
    batchImport();
