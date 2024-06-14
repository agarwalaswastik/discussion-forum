import mongoose from "mongoose";

import type ConversationTypes from "conversation";

const messageSchema = new mongoose.Schema<ConversationTypes.Message>({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, required: true },
  contents: { type: String, required: true },
});

const conversationSchema = new mongoose.Schema<ConversationTypes.Model>({
  contacterId: { type: mongoose.Schema.Types.ObjectId, required: true },
  responderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  messages: { type: [messageSchema], default: [] },
});

const Conversation = mongoose.model<ConversationTypes.Model>("Conversation", conversationSchema);

export default Conversation;