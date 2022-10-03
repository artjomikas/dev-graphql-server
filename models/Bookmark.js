const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  user_id_bookmarked: {
    type: String,
  }
}, { timestamps: true })

module.exports = mongoose.model('Bookmarks', BookmarkSchema)
