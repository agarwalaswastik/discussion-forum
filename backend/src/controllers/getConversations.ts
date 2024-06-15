import type { MyRequestHandler } from "server";
import type ConversationTypes from "conversation";

import Conversation from "../models/conversationModel";

/*
 * this controller should attempt to get all the conversations data of the verified user
 *
 * important points
 * - the user data of all the users that the verified user has conversed with also has to be returned as it contains username, picturePath, etc
 * - passwords of the other users should not be sent
 * - it's not a problem if a user isn't found, let the front-end handle that case
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type ResBody = { conversations?: ConversationTypes.Model[] };
type RequestHandler = MyRequestHandler<object, ResBody, object, object>;
const getConversations: RequestHandler = async (_req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Conversations couldn't be retrieved as no verified user was found");

    const conversations = await Conversation.find({ $or: [{ contacter: user._id }, { responder: user._id }] })
      .populate("contacter", "-password")
      .populate("responder", "-password");
    if (!conversations) return res.status(400).json({ error: "No conversations found" });

    res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};

export default getConversations;
