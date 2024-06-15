import type { MyRequestHandler } from "server";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type ConversationTypes from "conversation";

/*
 * this controller should attempt to create a conversation between verified user and the
 * username specified in the request body
 * 
 * important points:
 * - one cannot start a conversation with themselves
 * - a new conversation cannot be created if one already exists
 * 
 * server-side errors that should be thrown
 * - user hasn't been verified
 * - otherUsername hasn't been validated
 */
type ReqBody = { otherUsername?: string };
type ResBody = { data?: ConversationTypes.Model };
type RequestHandler = MyRequestHandler<object, ResBody, ReqBody, object>;
const startConversation: RequestHandler = async (req, res, next) => {
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
        { $and: [{ contacter: user._id }, { responder: otherUser._id }] },
        { $and: [{ responder: user._id }, { contacter: otherUser._id }] },
      ],
    });
    if (existingConversation) return res.status(400).json({ error: "Conversation already exists" });

    const newConversation = new Conversation({ contacter: user._id, responder: otherUser._id });
    if (!newConversation) return res.status(400).json({ error: "Invalid data" });

    await newConversation.save();
    
    let responseData = await newConversation.populate("contacter", "-password");
    responseData = await responseData.populate("responder", "-password");
    res.status(201).json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

export default startConversation;
