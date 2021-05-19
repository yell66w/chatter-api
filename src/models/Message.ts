import mongoose, { Schema } from "mongoose";
export const messageSchema: Schema = new mongoose.Schema({
  content: {
    type: String,
  },
  to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Message = mongoose.model("Message", messageSchema);
