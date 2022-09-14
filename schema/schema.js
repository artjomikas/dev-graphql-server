const { buildSchema } = require('graphql')


const schema = buildSchema(`
  type Post {
    id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likesNum: Int
    description: String
    author: User!
    createdAt: String 
    likes: [String]
    bookmarks: [String]
  }

  type User {
    _id: String
    username: String!
    imageURL: String!
    name: String!
    email: String
  }

  input PostInput {
    id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likesNum: Int
    description: String
    author: UserInput!
    likes: String
    bookmarks: String
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
    getPost(id: ID): Post
    getBookmarks(user_id: String): [Post]
    getAllUsers: [User]
    getUser(id: String): [User]
  }

  type Mutation {
    addUser(input: UserInput): User
    createPost(input: PostInput): Post
    addLike(post_id: ID, user_id: String ): Post
    removeLike(post_id: ID, user_id: String ): Post
    addBookmark(post_id: ID, user_id: String ): Post
    removeBookmark(post_id: ID, user_id: String ): Post
  }

`)

module.exports = schema