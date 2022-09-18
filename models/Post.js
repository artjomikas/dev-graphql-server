const mongoose = require('mongoose');
const { UserSchema } = require('./User')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  permaLink: {
    type: String,
  },
  readTime: {
    type: Number,
  },
  like: {
    type: Number,
  },
  description: {
    type: String,
  },
  author: {
    type: UserSchema
  },
  likes: {
    type: [String]
  },
  bookmarks: {
    type: [String]
  },
  bookmarked: {
    type: Boolean
  }
}, { timestamps: true })

const Post = mongoose.model('Posts', PostSchema)

module.exports = {Post, PostSchema}
