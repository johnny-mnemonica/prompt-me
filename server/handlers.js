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

// get dummy users - API - NOTE: This is for demo purposes only.
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


// get dummy user by ID - NOTE: This is for demo purposes only.
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
            .json({status: 404, data: _id, message: "User ID does not exist"})
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

// post - create new user
const createNewUser = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const data = await db.collection("users").findOne({_id: req.body._id});

        if(!data){
            const userObj = req.body
            const postObj = {_id: req.body._id, posts: []}

            await db.collection("users").insertOne(userObj);
            await db.collection("posts").insertOne(postObj);

            client.close();

            res
            .status(200)
            .json({status: 200, message: "Success! User has been created"});

        } else {
            res
            .status(418)
            .json({status: 418, data: req.body._id, message: "User already exists"});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// post - create new blog post
const createNewBlogPost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const data = req.body;

        await db.collection("posts").updateOne({_id: req.body.postAuthorId}, {"$push" :{"posts": data}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! Post created successfully"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// patch - follow friend

const followFriend = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const friend_id = req.params.friendid;
        
        //TODO: validate whether user is following the person already

        //TODO: validate whether friend exists in database(dummy user - for demo purposes only)

        await db.collection("users").updateOne({_id: user_id}, {"$push" :{"following": friend_id}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! You made a new friend!"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// patch - unfollow friend

const unfollowFriend = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const friend_id = req.params.friendid;
        
        //TODO: validate whether user is following the person already

        //TODO: validate whether friend exists in database(dummy user - for demo purposes only)

        await db.collection("users").updateOne({_id: user_id}, {"$pull" :{"following": friend_id}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! You made a new enemy!"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// put - comment on post
const addComment = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");

        const post_id = req.params.id;
        const comment = req.body;

        //TODO: check if postid exists

        await db.collection("posts").updateOne({"posts._id": post_id}, {"$push" :{"posts.$.comments": comment}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! Comment created successfully"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// patch - like post
const likePost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const post_id = req.params.postid;

        console.log(user_id);
        console.log(post_id);
        
        //TODO: validate whether the post exists

        //TODO: validate whether post is liked by the user already

        await db.collection("posts").updateOne({"posts._id": post_id}, {"$push" :{"posts.$.likedBy": user_id}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! Post liked successfully!"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// patch - unlike post
const unlikePost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const post_id = req.params.postid;

        console.log(user_id);
        console.log(post_id);
        
        //TODO: validate whether the post exists

        //TODO: validate whether post is liked by the user already

        await db.collection("posts").updateOne({"posts._id": post_id}, {"$pull" :{"posts.$.likedBy": user_id}});

        client.close();

        res
        .status(200)
        .json({status: 200, message: "Success! Post unliked successfully!"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// delete post by id
const deleteBlogPost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const post_id = req.params.postid;
        const user_id = req.params.userid

        //TODO: verify that postID exists
        //TODO: verify that the user is authorized to delete blog post

        const result = await db.collection("posts").updateOne({_id: user_id}, {"$pull" :{"posts": {_id: post_id}}});

        client.close();

        //if result.modifiedCount === 1
        
        res
        .status(200)
        .json({status: 200, message: "Success! Post deleted successfully"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

// delete comment by id
const deleteComment = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const post_id = req.params.postid;
        const comment_id = req.params.commentid;

        //TODO: verify that commentID exists
        //TODO: verify that the user is authorized to delete comment

        const result = await db.collection("posts").updateOne({"posts._id": post_id}, {"$pull" :{"posts.$.comments": {_id: comment_id}}});

        client.close();

        console.log(result);

        //if result.modifiedCount === 1
        
        res
        .status(200)
        .json({status: 200, message: "Success! Comment deleted successfully"});

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

module.exports = {
    getDummyUsers,
    getUserById,
    getPostsbyUserId,
    getPostsById,
    createNewUser,
    createNewBlogPost,
    followFriend,
    unfollowFriend,
    addComment,
    likePost,
    unlikePost,
    deleteBlogPost,
    deleteComment
}