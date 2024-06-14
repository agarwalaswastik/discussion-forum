import type { MyRequestHandler } from "server";
import type ConversationTypes from "conversation";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

type Params = { otherUsername?: string };
type ResBody = { data?: ConversationTypes.Message };
type ReqBody =  { contents?: string; }
type RequesHandler = MyRequestHandler<Params, ResBody, ReqBody, object>;
const sendMessage: RequesHandler = async (req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Message couldn't be sent as no verified user was found");

    const receiverUsername = req.params.otherUsername;
    if (!receiverUsername) return res.status(400).json({ error: "Invalid username" });

    const { contents } = req.body;
    if (!contents) throw new Error("Message couldn't be sent as no contents were found");

    const receiverUser = await User.findOne({ username: receiverUsername });
    if (!receiverUser) return res.status(400).json({ error: "User doesn't exist" });

    const conversation = await Conversation.findOne({
      $or: [
        { $and: [{ contacterId: receiverUser._id }, { responderId: user._id }] },
        { $and: [{ contacterId: user._id }, { responderId: receiverUser._id }] },
      ],
    });
    if (!conversation) return res.status(400).json({ error: "Conversation doesn't exist" });

    const newMessage = { senderId: user._id, contents, sentAt: new Date() };
    conversation.messages.push(newMessage);
    await conversation.save();

    res.status(201).json({ data: newMessage });
  } catch (error) {
    next(error);
  }
};

export default sendMessage;
