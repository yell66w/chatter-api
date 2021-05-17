import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { startDatabase } from "./database";
import { getUser } from "./utils/decodedToken";
import { Server } from "socket.io";

const PORT = 8000;
const app = express();

const run = async () => {
  try {
    await startDatabase();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const user = getUser(req);
        if (!user) return { user: null };
        return { user };
      },
      formatError: (err) => {
        if (err.message.startsWith("Database Error: ")) {
          return new Error("Internal server error");
        }
        return err;
      },
    });
    server.applyMiddleware({ app });
    const http = app.listen({ port: PORT }, () =>
      console.log(
        `🚀 🐱‍🏍 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
    const io = new Server(http);
    io.on("connection", (socket) => {
      console.log("a user connected");
    });
  } catch (error) {
    console.error(error.message);
  }
};
run();
