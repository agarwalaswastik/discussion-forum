import mongoose from "mongoose";

import type CommentTypes from "comment";

const commentSchema = new mongoose.Schema<CommentTypes.Model>(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Community" },
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
    parent: { type: mongoose.Schema.Types.ObjectId, required: true },
    contents: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentTypes.Model>("Comment", commentSchema);

export default Comment;
