import { Message } from "./Message";

export const resolvers = {
  Query: {
    messages: () => Message.all(),
  },
};
