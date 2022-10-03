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
    author: [User]
    createdAt: String 
    status: String
    likes: [Like]
    bookmarked: Boolean
    liked: Boolean
    user_id: String
    likesCount: Int
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    id: ID
    text: String
    author: User
  }

  input CommentInput {
    id: ID
    text: String!
    post_id: ID!
    author: UserInput!
  }

  type Bookmark {
    id: ID
    post_id: ID!
    user_id_bookmarked: String!
  }

  type Like {
    id: ID
    post_id: ID!
    user_id_liked: String!
  }

  type PostEdge {
    node: Post!
    cursor: String!
  }

  type PostConnection {
    totalCount: Int
    edges: [PostEdge!]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String!
    endCursor: String!
  }

  type User {
    _id: String
    username: String
    imageURL: String
    name: String
    email: String
    provider: String
    bio: String
    twitter: String
    github: String
    website: String
    likesCount: Int
    bookmarksCount: Int
    articlesCount: Int
  }

  input PostInput {
    _id: ID
    title: String!
    imageURL: String!
    permaLink: String!
    readTime: Int
    likesNum: Int
    description: String
    author: UserInput!
    likes: String
    bookmarks: String
    status: String
  }

  input UserInput {
    _id: String
    username: String
    imageURL: String
    name: String
    email: String
    provider: String
    bio: String
    twitter: String
    github: String
    website: String
  }
  
  type Query {
    getAllPosts(user: String): [Post]
    getPopularPosts(user: String): [Post]
    getPost(user: String, id: String): [Post]
    getBookmarks(user_id: String): [Post]
    getLikes(user_id: String): [Post]
    getLikesCount(user_id: String): Int
    getBookmarksCount(user_id: String): Int
    getAllUsers: [User]
    getUser(id: String): [User]
  }

  type Mutation {
    addUser(input: UserInput): User
    updateUser(user_id: String, data: UserInput): User
    createPost(input: PostInput): Post
    addLike(post_id: ID, user_id: String): Like
    removeLike(post_id: ID, user_id: String): Like
    addComment(input: CommentInput): Post
    addBookmark(post_id: ID, user_id: String ): Bookmark
    removeBookmark(post_id: ID, user_id: String): Bookmark
  }
`)

module.exports = schema