const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Post = require('./model/post');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alte:A123456@cluster0-92q9t.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true })
.then(() => {
  console.log('Database Connected!');
}).catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

// A123456

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(postResult => {
    const postId = postResult.id;
    res.status(201).json({
      message: 'Post added Successfully',
      id: postId
    });
  });
});

app.get('/api/posts', (req, res, next) => {
Post.find().then((documents) => {
  console.log(documents);
  res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(results => {
    console.log(results);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });
});
module.exports = app;
