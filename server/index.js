// server setup

const express = require('express');
const morgan = require('morgan');
const port = 8000;
const {
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
} = require('./handlers');

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

.get("/api/getdummyusers", getDummyUsers)
.get("/api/getdummyuser/:id", getDummyUserById)
.get("/api/getposts/:id", getPostsbyUserId)
.get("/api/getpost/:id", getPostsById)
.get("/api/getusers", getUsers)
.get("/api/getuser/:id", getUserById)
.post("/api/createuser", createNewUser)
.post("/api/createpost", createNewBlogPost)
.patch("/api/follow", followFriend)
.patch("/api/unfollow", unfollowFriend)
.put("/api/:id/addcomment", addComment)
.patch("/api/:userid/likepost/:postid", likePost)
.patch("/api/:userid/unlikepost/:postid", unlikePost)
.delete("/api/:userid/deletepost/:postid", deleteBlogPost)
.delete("/api/:userid/:postid/deletecomment/:commentid", deleteComment)


//TO DO
//GET user by ID - DONE
//GET posts by user - DONE
//GET post by ID - DONE
//POST - create new user - DONE
//POST - create new post - DONE
//PATCH - follow friend - DONE 
//PATCH - unfollow friend - DONE 
//PUT - comments - DONE 
//PATCH - like post - DONE
//PATCH - unlike post - DONE 
//DELETE post by ID - DONE 
//DELETE comment by ID - DONE 
//GET all users (in database) - DONE
//GET user by ID (in database) - DONE
//PATCH edit post (stretch)
//PATCH edit comment (stretch)
//DELETE user (stretch)



// test endpoint
.get('/test', (req, res) => {
  res.status(200)
  .json({status: 200, message: 'Hello World!'});
})

// port setup
.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})