import type { MyRequestHandler } from "server";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type ConversationTypes from "conversation";

type ReqBody = { otherUsername?: string };
type ResBody = { data?: ConversationTypes.Model };
type RequesHandler = MyRequestHandler<object, ResBody, ReqBody, object>;
const startConversation: RequesHandler = async (req, res, next) => {
  try {
    const { otherUsername } = req.body;
    if (!otherUsername) throw new Error("Conversation couldn't be started as no other username was found");

    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Conversation couldn't be started as no verified user was found");

    if (otherUsername === user.username)
      return res.status(400).json({ error: "Can't start a conversation with yourself" });

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
    res.status(201).json({ data: newConversation });
  } catch (error) {
    next(error);
  }
};

export default startConversation;
