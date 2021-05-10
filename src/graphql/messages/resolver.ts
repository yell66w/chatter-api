import { Message } from "../../models/Message";
import { User } from "../../models/User";

interface createMessageProps {
  content: string;
  to_user_id: string;
}
export const resolvers = {
  Query: {
    messages: async () =>
      await Message.find().populate("to_user").populate("from_user"),
  },
  Mutation: {
    sendMessage: async (
      _: any,
      { content, to_user_id }: createMessageProps
    ) => {
      const to_user = await User.findById(to_user_id);
      const from_user = await User.findById("6098d28f6400fb28905e9891");
      const message = await new Message({
        content,
        to_user: to_user_id,
        from_user: "6098d28f6400fb28905e9891",
      }).save();
      from_user.sentMessages.push(message._id);
      to_user.receivedMessages.push(message._id);
      await from_user.save();
      await to_user.save();
      return message.populate("to_user").populate("from_user");
    },
  },
};
