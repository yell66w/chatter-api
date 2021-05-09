import { gql } from "apollo-server-express";
export const typeDef = gql`
  type Message {
    content: String
    from_user: User
    to_user: User
  }
  extend type Query {
    messages: [Message]
  }
`;
