import { gql } from "apollo-server-express";
export const typeDef = gql`
  type Conversation {
    id: ID!
    title: String!
    creator: UserQuery!
    participants: [UserQuery!]
    messages: [Message]
    createdAt: Date!
    updatedAt: Date!
  }
  extend type Query {
    conversations: [Conversation]
  }
  type ConversationQuery {
    id: ID!
    title: String!
    updatedAt: String!
    createdAt: Date!
  }
  extend type Mutation {
    createPrivateConversation(to_user_id: ID!): createConversationReturn!
  }
  type createConversationReturn {
    created: Boolean!
  }
`;
