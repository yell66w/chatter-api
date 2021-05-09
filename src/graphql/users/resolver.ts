import { User } from "./User";

export const resolvers = {
  Query: {
    users: () => User.all(),
  },
};
