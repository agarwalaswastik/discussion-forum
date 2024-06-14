import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type UserTypes from "user";
import type { Types } from "mongoose";
import type ConversationTypes from "conversation";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserTypes.Model & { _id: Types.ObjectId } = res.locals.verifiedUser;

    const receiverUsername = req.params.otherUsername;
    if (!receiverUsername) return res.status(400).json({ error: "Invalid username" });

    const { contents }: { contents: string } = req.body;

    const receiverUser = await User.findOne({ username: receiverUsername });
    if (!receiverUser) return res.status(400).json({ error: "User doesn't exist" });

    const conversation = await Conversation.findOne({
      $or: [
        { $and: [{ contacterId: receiverUser._id }, { responderId: user._id }] },
        { $and: [{ contacterId: user._id }, { responderId: receiverUser._id }] },
      ],
    });

    if (!conversation) return res.status(400).json({ error: "Conversation doesn't exist" });

    const sentAt = new Date();
    const newMessage: ConversationTypes.Message = { senderId: user._id, contents, sentAt };
    conversation.messages.push(newMessage);
    
    await conversation.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export default sendMessage;
