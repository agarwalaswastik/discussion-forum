import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type UserTypes from "user";
import type { Types } from "mongoose";

const getConversations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserTypes.Model & { _id: Types.ObjectId } = res.locals.verifiedUser;

    const conversations = await Conversation.find({ $or: [{ contacterId: user._id }, { responderId: user._id }] });
    if (!conversations) return res.status(400).json({ error: "No conversations found" });

    const userIds: Types.ObjectId[] = [];
    conversations.forEach((elem) => {
      if (elem.contacterId === user._id) userIds.push(elem.responderId);
      else userIds.push(elem.contacterId);
    });

    const users = await Promise.all(userIds.map((elem) => User.findById(elem).select("-password")));

    res.status(200).json({ users, conversations });
  } catch (error) {
    next(error);
  }
};

export default getConversations;
