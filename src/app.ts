import express from "express";
import { ApolloServer } from "apollo-server-express";
const PORT = 8000;
const app = express();

import users from "./graphql/users";
import messages from "./graphql/messages";

const server = new ApolloServer({
  typeDefs: [users.typeDef, messages.typeDef],
  resolvers: [users.resolvers, messages.resolvers],
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
