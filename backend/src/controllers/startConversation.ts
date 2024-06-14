import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type UserTypes from "user";
import type { Types } from "mongoose";

const startConversation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otherUsername }: { otherUsername: string } = req.body;
    const user: UserTypes.Model & { _id: Types.ObjectId } = res.locals.verifiedUser;

    const otherUser = await User.findOne({ username: otherUsername });
    if (!otherUser) return res.status(400).json({ error: "No such user" });

    const existingConversation = await Conversation.findOne({
      $or: [
        { $and: [{ contacterId: user._id }, { responderId: otherUser._id }] },
        { $and: [{ responderId: user._id }, { contacterId: otherUser._id }] },
      ],
    });

    if (existingConversation) return res.status(400).json({ error: "Conversation already exists" });

    const newConversation = new Conversation({ contacterId: user._id, responderId: otherUser._id });
    if (!newConversation) return res.status(400).json({ error: "Invalid data" });

    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    next(error);
  }
};

export default startConversation;
