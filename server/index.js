// server setup

const express = require('express');
const morgan = require('morgan');
const port = 8000;
const {
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
  deleteComment} = require('./handlers');

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

// endpoints below!

.get("/api/getusers", getDummyUsers)
.get("/api/getuser/:id", getUserById)
.get("/api/getposts/:id", getPostsbyUserId)
.get("/api/getpost/:id", getPostsById)
.post("/api/createuser", createNewUser)
.post("/api/createpost", createNewBlogPost)
.patch("/api/follow/:userid/:friendid", followFriend)
.patch("/api/unfollow/:userid/:friendid", unfollowFriend)
.put("/api/:id/addcomment", addComment)
.patch("/api/:userid/likepost/:postid", likePost)
.patch("/api/:userid/unlikepost/:postid", unlikePost)
.delete("/api/:userid/deletepost/:postid", deleteBlogPost)
.delete("/api/:postid/deletecomment/:commentid", deleteComment)


//TO DO
//GET user by ID - DONE
//GET posts by user - DONE
//GET post by ID - DONE
//POST - create new user - DONE
//POST - create new post - DONE
//PATCH - follow friend - DONE w/ TODO
//PATCH - unfollow friend - DONE w/ TODO
//PUT - comments - DONE w/ TODO
//PATCH - like post - DONE w/ TODO
//PATCH - unlike post - DONE w/ TODO
//DELETE post by ID - DONE w/ TODO
//DELETE comment by ID - DONE w/ TODO
//GET all users (in database)
//GET user by ID (in database)
//PATCH edit post 
//PATCH edit comment (optional)


// test endpoint
.get('/test', (req, res) => {
  res.status(200)
  .json({status: 200, message: 'Hello World!'});
})

// port setup
.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})