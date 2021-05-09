import { gql } from "apollo-server-express";
export const typeDef = gql`
  type Message {
    id: ID!
    content: String!
    to_user: User!
    from_user: User!
    createdAt: Date
  }
  extend type Query {
    messages: [Message]
  }
  extend type Mutation {
    sendMessage(content: String!, to_user_id: ID!): Message!
  }
`;
