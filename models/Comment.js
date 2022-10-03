const mongoose = require('mongoose');
const { UserSchema } = require('./User')

const CommentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  author: {
    type: UserSchema
  },
}, { timestamps: true })

const Comment = mongoose.model('Comments', CommentSchema)

module.exports = { Comment, CommentSchema }