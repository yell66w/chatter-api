import { AuthenticationError } from "apollo-server-express";
import { Message } from "../../models/Message";
import { User } from "../../models/User";
import { ApolloContext } from "../users/resolver";

interface createMessageProps {
  content: string;
  to_user_id: string;
}
export const resolvers = {
  Query: {
    messages: async (_: any, __: any, ctx: ApolloContext) => {
      if (ctx.user) {
        console.log(ctx.user);
        return await Message.find().populate("to_user").populate("from_user");
      }
      throw new AuthenticationError("You need to be logged in to continue");
    },
  },
  Mutation: {
    sendMessage: async (
      _: any,
      { content, to_user_id }: createMessageProps,
      ctx: ApolloContext
    ) => {
      if (ctx.user) {
        const to_user = await User.findById(to_user_id);
        const from_user = await User.findById(ctx.user._id);

        if (to_user && from_user) {
          const message = await new Message({
            content,
            to_user: to_user_id,
            from_user: ctx.user._id,
          }).save();
          from_user.sentMessages.push(message._id);
          to_user.receivedMessages.push(message._id);
          await from_user.save();
          await to_user.save();
          return {
            sent: true,
          };
        }
        return {
          sent: false,
        };
      }
      throw new AuthenticationError("You must be logged in to continue!");
    },
  },
};
