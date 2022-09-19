const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema.js");
const connectDB = require("./config/config");
const { Post } = require("./models/Post");
const { userModel } = require("./models/User");
const colors = require("colors");
const Bookmark = require("./models/Bookmark");
const Like = require("./models/Like");

const app = express();

app.use(cors());

connectDB();

const root = {
  getAllPosts: ({ user }) => {
    return Post.aggregate([
      {
        $addFields: { bookmarkedCheck: null },
      },
      {
        $addFields: { likedCheck: null },
      },
      {
        $lookup: {
          from: "bookmarks",
          let: { user_id: user, post_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user_id_bookmarked", "$$user_id"] },
                    { $eq: ["$post_id", "$$post_id"] },
                  ],
                },
              },
            },
            { $project: { post_id: 0, readTime: 0 } },
          ],
          as: "bookmarkedCheck",
        },
      },
      {
        $lookup: {
          from: "likes",
          let: { user_id: user, post_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user_id_liked", "$$user_id"] },
                    { $eq: ["$post_id", "$$post_id"] },
                  ],
                },
              },
            },
            { $project: { post_id: 0, readTime: 0 } },
          ],
          as: "likedCheck",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ["$bookmarkedCheck", 0] },
              { $arrayElemAt: ["$likedCheck", 0] },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $addFields: { bookmarked: { $gt: ["$user_id_bookmarked", null] } },
      },
      {
        $addFields: { liked: { $gt: ["$user_id_liked", null] } },
      },
    ]);
  },
  getAllUsers: () => {
    return userModel.find();
  },
  getUser: ({ id }) => {
    return userModel.find({ _id: id });
  },
  getBookmarks: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Bookmark.find({ user_id_bookmarked: user_id }).populate("posts");
  },
  getLikes: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Post.find({ likes: user_id });
  },
  getLikesCount: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Like.count({ user_id_liked: user_id });
  },
  getBookmarksCount: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Post.count({ bookmarks: user_id });
  },
  addBookmark: ({ user_id, post_id }) => {
    const bookmark = new Bookmark({
      user_id_bookmarked: user_id,
      post_id: post_id,
    });
    return bookmark.save();
  },
  addLike: ({ user_id, post_id }) => {
    const like = new Like({ user_id_liked: user_id, post_id: post_id });
    return like.save();
  },
  removeBookmark: ({ id }) => {
    return Bookmark.findOneAndRemove({ _id: id });
  },
  removeLike: ({ id }) => {
    return Like.findOneAndRemove({ _id: id });
  },
  createPost: ({ input }) => {
    const post = new Post({ ...input });
    return post.save();
  },
  addUser: ({ input }) => {
    const user = new userModel({ ...input });
    return user.save();
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server started on port 3000".yellow)
);
