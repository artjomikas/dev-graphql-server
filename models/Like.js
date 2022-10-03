const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  user_id_liked: {
    type: String,
  }
})

const Like = mongoose.model('Likes', LikeSchema)

module.exports = {Like, LikeSchema}