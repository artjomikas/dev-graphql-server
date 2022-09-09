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

  type BookmarkList{
    id: ID
    user_id: String!
    post_id: Post!
  }

  input BookmarkInput{
    id: ID
    user_id: ID!
    post_id: ID!
  }

  type User {
    _id: String
    username: String!
    imageURL: String!
    name: String!
    email: String
  }

  type Bookmark {
    bookmarked_user_id: String
  }

  input BookmarksInput {
    bookmarked_user_id: String
  }

  type Like {
    liked_user_id: String
  }

  input LikeInput {
    liked_user_id: String
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
    getPostInfo(user_id: String): [Post]
    getUser(id: ID): User
    getBookmarkByUserID(id: ID): [BookmarkList]
    getBookmarkByUserIDAndPostID(user_id: ID, post_id: ID): [BookmarkList]
  }

  type Mutation {
    createPost(input: PostInput): Post
    addUser(input: UserInput): User
    addBookmark(input: BookmarkInput): BookmarkList
    addLike(post_id: ID, user_id: String ): Post
    removeBookmark(id: ID): BookmarkList
  }
`)

module.exports = schema