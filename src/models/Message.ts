import mongoose, { Schema } from "mongoose";
import { userSchema } from "./User";
export const messageSchema: Schema = new mongoose.Schema({
  content: {
    type: String,
  },
  to_user: {
    type: userSchema,
    required: true,
  },
  from_user: {
    type: userSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Message = mongoose.model("Message", messageSchema);
