import { gql } from "apollo-server-express";
export const typeDef = gql`
  type Message {
    id: ID!
    content: String!
    conversation: ConversationQuery!
    to_user: UserQuery!
    from_user: UserQuery!
    createdAt: Date
  }
  extend type Query {
    messages: [Message]
    chats(limit: Int): [Message]
  }

  extend type Mutation {
    sendMessage(
      content: String!
      to_user_id: ID!
      conversation_id: ID!
    ): sendMessageReturn!
  }
  type sendMessageReturn {
    sent: Boolean!
  }
`;
