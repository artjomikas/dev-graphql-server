const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema.js");
const connectDB = require("./config/config");
const { Post } = require("./models/Post");
const { Comment } = require("./models/Comment");
const { User } = require("./models/User");
const colors = require("colors");
const Bookmark = require("./models/Bookmark");
const { Like } = require("./models/Like");
const mongoose = require("mongoose");
const scraper = require('./metadata-scrapper/scraper')

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
        $addFields: { authors: null },
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
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "author._id",
          foreignField: "_id",
          as: "author"
        }
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
      {
        $addFields: { likesCount: { $size: "$likes" } },
      },
      { $sort: { createdAt: -1 } }
    ]);
  },
  getPost: ({ user, id }) => {
    return Post.aggregate([
      {
        $addFields: { bookmarkedCheck: null },
      },
      {
        $addFields: { likedCheck: null },
      },
      {
        $addFields: { likes: null },
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
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "author._id",
          foreignField: "_id",
          as: "author"
        }
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
      {
        $addFields: { likesCount: { $size: "$likes" } },
      },
      {
        $match: { "_id": new mongoose.Types.ObjectId(id) }
      }
    ]);
  },
  getPopularPosts: ({ user }) => {
    return Post.aggregate([
      {
        $addFields: { bookmarkedCheck: null },
      },
      {
        $addFields: { likedCheck: null },
      },
      {
        $addFields: { likes: null },
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
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "author._id",
          foreignField: "_id",
          as: "author"
        }
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
      {
        $addFields: { likesCount: { $size: "$likes" } },
      },
      { $sort: { likesCount: -1 } }
    ])
  },
  getBookmarks: ({ user_id }) => {
    return Post.aggregate([
      {
        $addFields: { bookmarkedCheck: null },
      },
      {
        $addFields: { likedCheck: null },
      },
      {
        $addFields: { likes: null },
      },
      {
        $lookup: {
          from: "bookmarks",
          let: { user_id: user_id, post_id: "$_id" },
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
          let: { user_id: user_id, post_id: "$_id" },
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
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "author._id",
          foreignField: "_id",
          as: "author"
        }
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
      {
        $addFields: { likesCount: { $size: "$likes" } },
      },
      {
        $match: { bookmarked: true }
      },
      { $sort: { createdAt: 1 } }
    ]);
  },
  getLikes: ({ user_id }) => {
    // return Post.find({ $or: [{ 'likes.liked_user_id': user_id }, { 'bookmarks.bookmarked_user_id': user_id }] });
    return Post.find({ likes: user_id });
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
  removeBookmark: ({ user_id, post_id }) => {
    return Bookmark.findOneAndRemove({ user_id_bookmarked: user_id, post_id: post_id });
  },
  removeLike: ({ user_id, post_id }) => {
    return Like.findOneAndRemove({ user_id_liked: user_id, post_id: post_id });
  },
  addComment: ({ input }) => {
    console.log(input);
    return Post.findByIdAndUpdate({ _id: input.post_id }, { $push: { comments: input } });
  },
  updateUser: ({ user_id, data }) => {
    return User.findOneAndUpdate({ _id: user_id }, { $set: data })
  },
  createPost: ({ input }) => {
    const post = new Post({ ...input });
    return post.save();
  },
  getUser: ({ id }) => {
    return User.aggregate([
      {
        $addFields: { likes: null },
      },
      {
        $addFields: { bookmarks: null },
      },
      {
        $addFields: { articles: null },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "user_id_liked",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "user_id_bookmarked",
          as: "bookmarks"
        }
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author._id",
          as: "articles"
        }
      },
      {
        $addFields: { likesCount: { $size: "$likes" } },
      },
      {
        $addFields: { bookmarksCount: { $size: "$bookmarks" } },
      },
      {
        $addFields: { articlesCount: { $size: "$articles" } },
      },
      {
        $match: { _id: id }
      }
    ]);
  },
  addUser: ({ input }) => {
    const user = new User({ ...input });
    return user.save();
  },
};

app.use(express.json());

app.post('/api/scrape', async function (req, res) {
  try {
    const data = await scraper(req.body.url);
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});


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
