import { gql } from "apollo-server-express";
export const typeDef = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: Date!
    sentMessages: [Message]
    receivedMessages: [Message]
  }
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
