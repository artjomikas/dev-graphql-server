const mongoose = require('mongoose');

const BookMarkSchema = new mongoose.Schema({
  bookmarked_user_id: {
    type: String
  },
}, { timestamps: true }
)

module.exports = mongoose.model('Bookmarks', BookMarkSchema)
module.exports = BookMarkSchema