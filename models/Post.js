const mongoose = require('mongoose');
const { UserSchema } = require('./User')
const { LikeSchema } = require('./Like')
const { CommentSchema } = require('./Comment')

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
    type: [UserSchema]
  },
  likes: {
    type: [LikeSchema]
  },
  bookmarks: {
    type: [String]
  },
  bookmarked: {
    type: Boolean
  },
  liked: {
    type: Boolean
  },
  comments: {
    type: [CommentSchema]
  },
}, { timestamps: true })

const Post = mongoose.model('Posts', PostSchema)

module.exports = { Post, PostSchema }
