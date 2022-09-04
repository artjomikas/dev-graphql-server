const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const colors = require('colors');
const schema = require('./schema/schema.js')
const connectDB = require('./config/config')
const Post = require('./models/Post')

const app = express()

app.use(cors())

connectDB();


function createPost(input) {
  const id = Date.now()
  return {
    id, ...input
  }
}

const root = {
  getAllPosts: () => {
    return Post.find()
  },
  getPost: ({ id }) => {
    return Post.findById(id);
  },
  createPost: ({ input }) => {
    const post = createPost(input)
    const posts = new Post({ ...post })
    return posts.save()
  },
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

app.listen(5000, () => console.log("Server started on port 5000".yellow))
