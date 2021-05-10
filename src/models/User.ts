import mongoose, { Schema } from "mongoose";
export const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  sentMessages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
    default: [],
  },
  receivedMessages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", userSchema);
