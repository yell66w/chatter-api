import { Message } from "../../models/Message";
import { User } from "../../models/User";

interface createMessageProps {
  content: string;
  to_user_id: string;
}
export const resolvers = {
  Query: {
    messages: async () => await Message.find(),
  },
  Mutation: {
    sendMessage: async (
      _: any,
      { content, to_user_id }: createMessageProps
    ) => {
      const to_user = await User.findById(to_user_id);
      const from_user = await User.findById("6097fa92fd8169205c2990c2");
      const message = await new Message({ content, to_user, from_user }).save();
      from_user.sentMessages.push(message);
      to_user.receivedMessages.push(message);
      await from_user.save();
      await to_user.save();
      return message;
    },
  },
};
