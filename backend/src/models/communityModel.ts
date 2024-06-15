import mongoose from "mongoose";

import type CommunityTypes from "community";

const communitySchema = new mongoose.Schema<CommunityTypes.Model>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true, unique: true },
    description: String,
    picturePath: String,
    members: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] },
  },
  { timestamps: true }
);

const Community = mongoose.model<CommunityTypes.Model>("Community", communitySchema);

export default Community;
