// server setup

const express = require('express');
const morgan = require('morgan');
const port = 8000;
const {getDummyUsers, getUserById} = require('./handlers');

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


//TO DO
//GET user by ID - DONE
//GET posts by user
//GET post by ID
//PUT comments
//PUT likes
//PATCH edit post
//DELETE post by ID

// test endpoint
.get('/test', (req, res) => {
  res.status(200)
  .json({status: 200, message: 'Hello World!'});
})

// port setup
.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})