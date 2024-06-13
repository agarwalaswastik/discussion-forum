import mongoose from "mongoose";

import type UserTypes from "user";

const userSchema = new mongoose.Schema<UserTypes.Model>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picturePath: String,
    about: String,
    karma: Number,
  },
  { timestamps: true }
);

const User = mongoose.model<UserTypes.Model>("User", userSchema);

export default User;
