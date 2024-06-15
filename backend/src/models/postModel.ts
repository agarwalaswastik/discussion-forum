import mongoose from "mongoose";

import type PostTypes from "post";

const postSchema = new mongoose.Schema<PostTypes.Model>(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Community" },
    title: { type: String, required: true },
    contents: { type: String, required: true },
    picturePath: String,
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostTypes.Model>("Post", postSchema);

export default Post;
