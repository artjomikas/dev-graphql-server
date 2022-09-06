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
  createPost: ({ input }) => {
    const post = new Post({ ...input })
    return post.save()
  },
  addUser: ({ input }) => {
    const user = new User({ ...input })
    return user.save()
  },
  getBookmark: ({id}) => {
    return Bookmark.find({user_id : id}).populate('post_id', 'title')
  },
  addBookmark: ({ input }) => {
    const bookmark = new Bookmark({ ...input })
    return bookmark.save()
  },
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

app.listen(5000, () => console.log("Server started on port 5000".yellow))
