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

//////////////////////////////////////////////////////////

// GET dummy users - API - NOTE: This is for demo purposes only.
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

//////////////////////////////////////////////////////////

// GET dummy user by ID - NOTE: This is for demo purposes only.
const getDummyUserById = async (req, res) => {
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

//////////////////////////////////////////////////////////

//GET all users (in database - not using this for demo)
const getUsers = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const data = await db.collection("users").find().toArray();

        client.close();
        
        if(data.length === 0){
            res
            .status(404)
            .json({status: 404, message: "Error: No users found."})
        } else {
            res
            .status(200)
            .json({status: 200, data: data})
        }
    
    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.stack})
        console.log(err.message);
    }
}

//////////////////////////////////////////////////////////

//GET user by ID (in database - not using this for demo)
const getUserById = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
        
        const db = client.db("promptme");
    
        const _id = req.params.id;

        const data = await db.collection("users").findOne({_id});

        client.close();
        
        if(!data){
            res
            .status(404)
            .json({status: 404, message: "Error: User ID does not exist."})
        } else {
            res
            .status(200)
            .json({status: 200, data: data})
        }
    
    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.stack})
        console.log(err.message);
    }
}

//////////////////////////////////////////////////////////

// GET posts by userID
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

//////////////////////////////////////////////////////////

// GET posts by id
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

//////////////////////////////////////////////////////////

// POST - create new user
const createNewUser = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const data = await db.collection("users").findOne({_id: req.body._id});

        if(!data){
            const userObj = {...req.body, following: []}
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

//////////////////////////////////////////////////////////

// POST - create new blog post
const createNewBlogPost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const data = {...req.body, comments: [], likedBy: []};

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

//////////////////////////////////////////////////////////

// PATCH - follow friend
const followFriend = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);

        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const friend_id = req.params.friendid;

        // validate whether userid exists
        const userData = await db.collection("users").findOne({_id: user_id});

        if(!userData){
            return res
            .status(404)
            .json({status: 404, data: user_id, message: "Error: User ID does not exist"});
        }

        // NOTE: normally i would validate if friend id exists, but because we're using dummy users, i've skipped this step for now. 

        // validate whether the user is following the friend already
        const followingArray = userData.following

        const isFollowing = followingArray.includes(friend_id);

        if(isFollowing){
            return res
            .status(400)
            .json({status: 400, data: friend_id, message: "Error: You are already following this user!"});
        } 

        const result = await db.collection("users").updateOne({_id: user_id}, {"$push" :{"following": friend_id}});

        client.close();

        if(result.modifiedCount === 1){
            res
            .status(200)
            .json({status: 200, message: "Success! Follow was successful!"});
        } else {
            res
            .status(400)
            .json({status: 400, data: comment, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

// PATCH - unfollow friend
const unfollowFriend = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const friend_id = req.params.friendid;
        
        // validate whether userid exists
        const userData = await db.collection("users").findOne({_id: user_id});

        if(!userData){
            return res
            .status(404)
            .json({status: 404, data: user_id, message: "Error: User ID does not exist"});
        }

        // NOTE: normally i would validate if friend id exists, but because we're using dummy users, i've skipped this step for now. 

        // validate whether the user is following the friend 
        const followingArray = userData.following

        const isFollowing = followingArray.includes(friend_id);

        if(!isFollowing){
            return res
            .status(400)
            .json({status: 400, data: friend_id, message: "Error: You were never following this user!"});
        } 

        const result = await db.collection("users").updateOne({_id: user_id}, {"$pull" :{"following": friend_id}});

        client.close();

        if(result.modifiedCount === 1){
            res
            .status(200)
            .json({status: 200, message: "Success! You made a new enemy!"});
        } else {
            res
            .status(400)
            .json({status: 400, data: comment, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

// put - comment on post
const addComment = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");

        const post_id = req.params.id;
        const comment = req.body;

        //validate whether postid exists

        const postData = await db.collection("posts").findOne({"posts._id": post_id});

        if(!postData){
            return res
            .status(404)
            .json({status: 404, data: post_id, message: "Error: Post ID does not exist"});
        }

        const result = await db.collection("posts").updateOne({"posts._id": post_id}, {"$push" :{"posts.$.comments": comment}});

        console.log(result);

        client.close();

        if(result.modifiedCount === 1){
            res
            .status(200)
            .json({status: 200, message: "Success! Comment created successfully"});
        } else {
            res
            .status(400)
            .json({status: 400, data: comment, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

// patch - like post
const likePost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const user_id = req.params.userid;
        const post_id = req.params.postid;
        
        //validate whether the post exists

        const postData = await db.collection("posts").findOne({"posts._id": post_id});

        console.log(postData);

        if(!postData){
            return res
            .status(404)
            .json({status: 404, data: post_id, message: "Error: Post ID does not exist"});
        }

        //validate whether the user exists

        const userData = await db.collection("users").findOne({_id: user_id});

        if(!userData){
            return res
            .status(404)
            .json({status: 404, data: user_id, message: "Error: User ID does not exist"});
        }

        //validate whether post is liked by the user already

        const likesArray = postData.posts.find((post) => post._id === post_id).likedBy

        const isLiked = likesArray.includes(user_id);

        if(isLiked){
            return res
            .status(400)
            .json({status: 400, data: post_id, message: "Error: You've already liked this post!"});
        } 

        const result = await db.collection("posts").updateOne({"posts._id": post_id}, {"$push" :{"posts.$.likedBy": user_id}});

        client.close();

        if(result.modifiedCount === 1){
        res
        .status(200)
        .json({status: 200, message: "Success! Post liked successfully!"});
        } else {
            res
            .status(400)
            .json({status: 400, data: post_id, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

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
        
        //validate whether the post exists

        const postData = await db.collection("posts").findOne({"posts._id": post_id});

        if(!postData){
            return res
            .status(404)
            .json({status: 404, data: post_id, message: "Error: Post ID does not exist"});
        }

       //validate whether post is liked by the user already

        const likesArray = postData.posts.find((post) => post._id === post_id).likedBy

        const isLiked = likesArray.includes(user_id);

        if(!isLiked){
            return res
            .status(400)
            .json({status: 400, data: post_id, message: "Error: You haven't liked this post yet!"});
        } 

        const result = await db.collection("posts").updateOne({"posts._id": post_id}, {"$pull" :{"posts.$.likedBy": user_id}});

        client.close();

        if(result.modifiedCount === 1){
            res
            .status(200)
            .json({status: 200, message: "Success! Post unliked successfully!"});
        } else {
            res
            .status(400)
            .json({status: 400, data: post_id, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

// delete post by id
const deleteBlogPost = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const post_id = req.params.postid;
        const user_id = req.params.userid

        //verify that postID exists

        const postData = await db.collection("posts").findOne({"posts._id": post_id});

        if(!postData){
            return res
            .status(404)
            .json({status: 404, data: post_id, message: "Error: Post ID does not exist"});
        }

        //verify that the user is authorized to delete blog post

        const postAuthor = postData.posts.find((post) => post._id === post_id).postAuthorId

        if(postAuthor !== user_id){
            return res
            .status(403)
            .json({status: 403, data: post_id, message: "User is not authorized to delete this post."});
        }

        await db.collection("posts").updateOne({_id: user_id}, {"$pull" :{"posts": {_id: post_id}}});

        client.close();

        if(result.modifiedCount === 1){
            res
            .status(200)
            .json({status: 200, message: "Success! Post deleted successfully"});
        } else {
            res
            .status(400)
            .json({status: 400, data: post_id, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

//////////////////////////////////////////////////////////

// delete comment by id
const deleteComment = async (req, res) => {
    try {
        const client = new
        MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("promptme");
    
        const post_id = req.params.postid;
        const comment_id = req.params.commentid;
        const user_id = req.params.userid;

        //verify that post id exists

        const postData = await db.collection("posts").findOne({"posts._id": post_id});

        if(!postData){
            return res
            .status(404)
            .json({status: 404, data: post_id, message: "Error: Post ID does not exist"});
        }

        //verify that commentID exists

        const commentData = await db.collection("posts").findOne({"posts.comments._id": comment_id});

        if(!commentData){
            return res
            .status(404)
            .json({status: 404, data: comment_id, message: "Error: Comment ID does not exist"});
        }
        
        //verify that the user is authorized to delete comment

        const commentAuthor = commentData.posts.find((post) => post._id === post_id).comments.find((comment) => comment._id === comment_id).author

        console.log(commentAuthor, "comment author");
        console.log(user_id, "userid");

        if(commentAuthor !== user_id){
            return res
            .status(403)
            .json({status: 403, data: user_id, message: "User is not authorized to delete this comment."});
        }

        const result = await db.collection("posts").updateOne({"posts._id": post_id}, {"$pull" :{"posts.$.comments": {_id: comment_id}}});

        client.close();

        console.log(result);

        if(result.modifiedCount === 1){
        res
        .status(200)
        .json({status: 200, message: "Success! Comment deleted successfully"});
        } else {
            res
            .status(400)
            .json({status: 400, data: post_id, message: "Something went wrong! Please try again or contact support for more details."});
        }

    } catch (err) {
        res
        .status(500)
        .json({status: 500, message: err.message});
    }
}

module.exports = {
    getDummyUsers,
    getDummyUserById,
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
    deleteComment,
    getUsers,
    getUserById
}