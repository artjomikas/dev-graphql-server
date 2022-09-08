const mongoose = require('mongoose');
const UserSchema = require('./User')
const LikeSchema = require('./Likes')

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
    type: [LikeSchema]
  }
}, { timestamps: true })

module.exports = mongoose.model('Posts', PostSchema)
