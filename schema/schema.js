
const { buildSchema } = require('graphql')


//Posts Type
const schema = buildSchema(`
  type Post {
    id: ID
    title: String!
    image: String!
    permaLink: String!
    readTime: Int!
    author: [Author]
  }

  type Author {
    id: ID
    name: String
    username: String
    image: String
  }

  input PostInput {
    id: ID
    title: String!
    image: String!
    permaLink: String!
    readTime: Int!
    author: [AuthorInput]
  }

  input AuthorInput {
    id: ID
    name: String
    username: String
    image: String
  }
  
  type Query {
    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  type Mutation {
    createPost(input: PostInput): Post
  }
`)

module.exports = schema