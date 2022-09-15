const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema.js')
const connectDB = require('./config/config')
const Post = require('./models/Post')
const { userModel } = require('./models/User')
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
    return userModel.find()
  },
  getUser: ({ id }) => {
    return userModel.find({ "_id": id })
  },
  getPost: ({ id }) => {
    return Post.findById(id);
  },
  getBookmarks: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Post.find({ bookmarks: user_id });
  },
  createPost: ({ input }) => {
    const post = new Post({ ...input })
    return post.save()
  },
  addUser: ({ input }) => {
    const user = new userModel({ ...input })
    return user.save()
  },
  addLike: ({ post_id, user_id }) => {
    return Post.findOneAndUpdate({ _id: post_id }, { $push: { likes: user_id } });
  },
  removeLike: ({ post_id, user_id }) => {
    return Post.findOneAndUpdate({ _id: post_id }, { $pull: { likes: user_id } });
  },
  addBookmark: ({ post_id, user_id }) => {
    return Post.findOneAndUpdate({ _id: post_id }, { $push: { bookmarks: user_id } });
  },
  removeBookmark: ({ post_id, user_id }) => {
    return Post.findOneAndUpdate({ _id: post_id }, { $pull: { bookmarks: user_id } });
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000".yellow))
