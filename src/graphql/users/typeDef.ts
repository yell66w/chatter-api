import { gql } from "apollo-server-express";
export const typeDef = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    messages: [Message]
    createdAt: Date
  }
  type Query {
    users: [User]
  }
`;
