import mongoose, { Schema } from "mongoose";
export const conversationSchema: Schema = new mongoose.Schema({
  title: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Conversation = mongoose.model("Conversation", conversationSchema);
