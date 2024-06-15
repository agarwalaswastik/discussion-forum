import mongoose from "mongoose";

import type ConversationTypes from "conversation";

const messageSchema = new mongoose.Schema<ConversationTypes.MessageInfo>({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, required: true },
  contents: { type: String, required: true },
});

const conversationSchema = new mongoose.Schema<ConversationTypes.Model>(
  {
    contacter: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    responder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);

const Conversation = mongoose.model<ConversationTypes.Model>("Conversation", conversationSchema);

export default Conversation;
