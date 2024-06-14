import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import Conversation from "../models/conversationModel";

import type UserTypes from "user";
import type { Types } from "mongoose";
import type ConversationTypes from "conversation";

const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserTypes.Model & { _id: Types.ObjectId } = res.locals.verifiedUser;

    const contacterConversations = await Conversation.find({ contacterId: user._id });
    const responderConversations = await Conversation.find({ responderId: user._id });

    if (!contacterConversations && !responderConversations)
      return res.status(400).json({ error: "No conversations found" });

    const contacerUsernames = await Promise.all(
      contacterConversations.map((elem) => User.findById(elem.responderId).select("username"))
    );
    const responderUsernames = await Promise.all(
      responderConversations.map((elem) => User.findById(elem.contacterId).select("username"))
    );

    const result: { contacter: string; responder: string; messages: ConversationTypes.Message[] }[] = [];

    result.push(
      ...contacerUsernames
        .filter((elem) => elem !== null)
        .map((elem, index) => ({
          contacter: user.username,
          responder: elem.username,
          messages: contacterConversations[index].messages,
        }))
    );

    result.push(
      ...responderUsernames
        .filter((elem) => elem !== null)
        .map((elem, index) => ({
          contacter: elem.username,
          responder: user.username,
          messages: responderConversations[index].messages,
        }))
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default getConversations;
