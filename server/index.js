// server setup

const express = require('express');
const morgan = require('morgan');
const port = 8000;
const {getDummyUsers, getUserById, getPostsbyUserId, getPostsById} = require('./handlers');

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


//TO DO
//GET user by ID - DONE
//GET posts by user - DONE
//GET post by ID - DONE
//POST - create user data structure
//POST - create new post
//PUT comments
//PUT likes
//PATCH edit post 
//PATCH edit comment (optional)
//DELETE post by ID
//DELETE comment by ID


// test endpoint
.get('/test', (req, res) => {
  res.status(200)
  .json({status: 200, message: 'Hello World!'});
})

// port setup
.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})