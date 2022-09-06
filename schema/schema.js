const { buildSchema } = require('graphql')


const schema = buildSchema(`
  type Post {
    id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likes: Int
    description: String
    author: User!
    createdAt: String 
  }
  
  input PostInput {
    id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likes: Int
    description: String
    author: UserInput!
  }

  type BookmarkList{
    id: ID!
    user_id: String
    post_id: Post
  }

  input BookmarkInput{
    id: ID!
    user_id: ID
    post_id: ID
  }

  type User {
    _id: String
    username: String!
    imageURL: String!
    name: String!
    email: String
  }

  input UserInput {
    _id: String
    username: String!
    imageURL: String!
    name: String!
    email: String
  }
  
  type Query {
    getAllPosts: [Post]
    getAllUsers: [User]
    getPost(id: ID): Post
    getUser(id: ID): User
    getBookmarkByUserID(id: ID): [BookmarkList]
  }

  type Mutation {
    createPost(input: PostInput): Post
    addUser(input: UserInput): User
    addBookmark(input: BookmarkInput): BookmarkList
  }
`)

module.exports = schema