const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  username: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema)
module.exports = UserSchema