const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema.js')
const connectDB = require('./config/config')
const Post = require('./models/Post')
const User = require('./models/User')
const colors = require('colors');
const Bookmark = require('./models/Bookmark')

const app = express()

app.use(cors())

connectDB();


const root = {
  getAllPosts: () => {
    return Post.find()
  },
  getAllUsers: () => {
    return User.find()
  },
  getUser: ({ id }) => {
    return User.findById(id)
  },
  getPost: ({ id }) => {
    return Post.findById(id);
  },
  getLikes: ({ liked_user_id }) => {
    return Post.find({ 'likes.liked_user_id' : liked_user_id });
  },
  createPost: ({ input }) => {
    const post = new Post({ ...input })
    return post.save()
  },
  addUser: ({ input }) => {
    const user = new User({ ...input })
    return user.save()
  },
  getBookmarkByUserID: ({ id }) => {
    return Bookmark.find({ user_id: id }).populate('post_id')
  },
  getBookmarkByUserIDAndPostID: ({ user_id, post_id }) => {
    return Bookmark.find({ user_id: user_id, post_id: { _id: post_id } }).populate('post_id')
  },
  addBookmark: ({ input }) => {
    const bookmark = new Bookmark({ ...input })
    return bookmark.save()
  },
  removeBookmark: ({ id }) => {
    return Bookmark.findByIdAndRemove(id)
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

app.listen(5000, () => console.log("Server started on port 5000".yellow))
