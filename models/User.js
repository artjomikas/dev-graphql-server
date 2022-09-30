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
  provider: {
    type: String,
  },
  bio: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  website: {
    type: String,
  },
}, { timestamps: true });


const User = mongoose.model('Users', UserSchema)

module.exports = { User, UserSchema }