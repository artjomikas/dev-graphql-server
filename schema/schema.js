const { buildSchema } = require('graphql')


const schema = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likesNum: Int
    description: String
    author: User!
    createdAt: String 
    status: String
    bookmarked: Boolean
    liked: Boolean
    user_id: String
  }

  type Bookmark {
    id: ID
    post_id: ID
    user_id_bookmarked: String
  }

  type Like {
    id: ID
    post_id: ID
    user_id_liked: String
  }

  type User {
    _id: String
    username: String!
    imageURL: String!
    name: String!
    email: String
  }

  input PostInput {
    _id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int!
    likesNum: Int
    description: String
    author: UserInput!
    likes: String
    bookmarks: String
    status: String
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
    getAllPostsAggregate(user: String): [Post]
    getPost(id: ID): Post
    getBookmarks(user_id: String): [Bookmark]
    getLikes(user_id: String): [Post]
    getLikesCount(user_id: String): Int
    getBookmarksCount(user_id: String): Int
    getAllUsers: [User]
    getUser(id: String): [User]
  }

  type Mutation {
    addUser(input: UserInput): User
    createPost(input: PostInput): Post
    addLike(post_id: ID, user_id: String ): Like
    removeLike(id: ID ): Post
    addBookmark(post_id: ID, user_id: String ): Bookmark
    removeBookmark(id: ID ): Bookmark
  }
`)

module.exports = schema