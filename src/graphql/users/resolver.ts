import { User } from "../../models/User";

interface createUserProps {
  name: string;
  email: string;
  password: string;
}
export const resolvers = {
  Query: {
    users: async () =>
      await User.find().populate("sentMessages").populate("receivedMessages"),
  },
  Mutation: {
    createUser: async (_: any, { name, email, password }: createUserProps) => {
      const newUser = new User({ name, email, password });
      return await newUser.save();
    },
  },
};
