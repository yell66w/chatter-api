import { gql } from "apollo-server-express";
export const typeDef = gql`
  type User {
    name: String
    email: String
    password: String
  }
  type Query {
    users: [User]
  }
`;
