import { gql } from "apollo-server-express";
export const typeDef = gql`
  scalar Date
  type Message {
    content: String
    from_user: User
    to_user: User
    createdAt: Date
  }
  extend type Query {
    messages: [Message]
  }
`;
