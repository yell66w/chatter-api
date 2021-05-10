import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { startDatabase } from "./database";

const PORT = 8000;
const app = express();

const run = async () => {
  try {
    await startDatabase();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 🐱‍🏍 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.error(error.message);
  }
};
run();
