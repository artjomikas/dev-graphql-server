const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  liked_user_id: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Likes', LikeSchema)
module.exports = LikeSchema