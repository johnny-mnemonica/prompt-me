const request = require("request-promise");
require("dotenv").config();
const { APP_ID, MONGO_URI } = process.env;

// setting up my mongo connexion

const { MongoClient } = require("mongodb");

require("dotenv").config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// get dummy users - API
const getDummyUsers = async (req, res) => {
    try {
        const options = {
            uri: 'https://dummyapi.io/data/v1/user?limit=10',
            headers: {"app-id": APP_ID},
        }
        const result = await request(options)
        const parsedResult = JSON.parse(result);
        res.status(200).json({ status: 200, data: parsedResult.data });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message});
    }
}


// get dummy user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const options = {
            uri: 'https://dummyapi.io/data/v1/user?limit=10',
            headers: {"app-id": APP_ID},
        }
        const result = await request(options)
        const parsedResult = JSON.parse(result);
        const user = parsedResult.data.find((user) => user.id === id);

        if(!user){
            res.status(404).json({ status: 404, data: id, message: "User ID does not exist" });
        } else {
            res.status(200).json({ status: 200, data: user });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message});
    }
}

// get posts by userID
const getPostsbyUserId = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const _id = req.params.id;
        const data = await db.collection("posts").findOne({_id});
    
        client.close();
    
        if(!data){
            res
            .status(404)
            .json({status: 404, data: [], message: "User ID does not exist"})
        } else {
            const result = data.posts;
            res
            .status(200)
            .json({status: 200, data: result})
        }
    
    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message})
    }
}

// get posts by id
const getPostsById = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const postId = req.params.id;

        const data = await db.collection("posts").findOne({"posts._id": postId});

        client.close();

        if(!data){
            res
            .status(404)
            .json({status: 404, data: postId, message: "Post ID does not exist"})
        } else {
            const result = data.posts.find((blogPost) => blogPost._id === postId);
            res
            .status(200)
            .json({status: 200, data: result})
        }
    
    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message})
    }
}


module.exports = {
    getDummyUsers,
    getUserById,
    getPostsbyUserId,
    getPostsById
}