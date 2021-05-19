import { AuthenticationError } from "apollo-server-express";
import { Conversation } from "../../models/Conversation";
import { ApolloContext } from "../users/resolver";

interface createPrivateConversationProps {
  message_id: string;
  to_user_id: string;
}
export const resolvers = {
  Query: {
    conversations: async (_: any, __: any, ctx: ApolloContext) => {
      if (ctx.user) {
        return await Conversation.find({
          participants: ctx.user._id,
        })
          .populate("participants", "-password -sentMessages -receivedMessages")
          .populate("messages")
          .populate("creator", "-password -sentMessages -receivedMessages");
      }
      throw new AuthenticationError("You need to be logged in to continue");
    },
  },
  Mutation: {
    createPrivateConversation: async (
      _: any,
      { to_user_id }: createPrivateConversationProps,
      ctx: ApolloContext
    ) => {
      if (ctx.user) {
        await new Conversation({
          title: "",
          creatorId: ctx.user._id,
          participants: [ctx.user._id, to_user_id],
        }).save();
        return {
          created: true,
        };
      }
      throw new AuthenticationError("You must be logged in to continue!");
    },
  },
};
