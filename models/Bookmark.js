const mongoose = require('mongoose');

const BookMarkSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }
}, { timestamps: true }
)

module.exports = mongoose.model('Bookmarks', BookMarkSchema)