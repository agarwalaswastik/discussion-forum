import type { MyRequestHandler } from "server";
import type ConversationTypes from "conversation";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

/*
 * this controller should attempt to send a message from verified user to the username
 * specified by the parameters
 *
 * important points
 * - a conversation must already exist between the 2 users before a message is sent
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { otherUsername?: string };
type ResBody = { data?: ConversationTypes.MessageInfo };
type ReqBody = { contents?: string };
type RequestHandler = MyRequestHandler<Params, ResBody, ReqBody, object>;
const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Message couldn't be sent as no verified user was found");

    const receiverUsername = req.params.otherUsername;
    if (!receiverUsername) return res.status(400).json({ error: "Invalid username" });

    const { contents } = req.body;
    if (!contents) return res.status(400).json({ error: "No message contents" });

    const receiverUser = await User.findOne({ username: receiverUsername });
    if (!receiverUser) return res.status(400).json({ error: "User doesn't exist" });

    const conversation = await Conversation.findOne({
      $or: [
        { $and: [{ contacter: receiverUser._id }, { responder: user._id }] },
        { $and: [{ contacter: user._id }, { responder: receiverUser._id }] },
      ],
    });
    if (!conversation) return res.status(400).json({ error: "Conversation doesn't exist" });

    const newMessage = { sender: user._id, contents, sentAt: new Date() };
    conversation.messages.push(newMessage);
    await conversation.save();

    res.status(201).json({ data: newMessage });
  } catch (error) {
    next(error);
  }
};

export default sendMessage;
