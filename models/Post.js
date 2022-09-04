const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
})

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  permaLink: {
    type: String,
  },
  readTime: {
    type: Number,
  },
  author: {
    type: [AuthorSchema],
  },

})

module.exports = mongoose.model('Posts', PostSchema)