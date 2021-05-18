import { User } from "../../models/User";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
interface createUserProps {
  name: string;
  email: string;
  password: string;
}
interface UserLoginInputProp {
  email: string;
  password: string;
}
export interface ApolloContext {
  user: any;
}

export const resolvers = {
  Query: {
    users: async (_: any, __: any, ctx: ApolloContext) => {
      if (ctx.user) {
        return await User.find().select("-password");
      }
      throw new AuthenticationError("You need to be logged in to continue!");
    },
    getAuthUser: async (_: any, __: any, ctx: ApolloContext) => {
      if (ctx.user) {
        ctx.user.id = ctx.user._id;
        ctx.user.createdAt = new Date(ctx.user.createdAt);
        return ctx.user;
      }
      return null;
    },
  },
  Mutation: {
    register: async (
      _: any,
      { name, email, password }: createUserProps,
      ctx: ApolloContext
    ) => {
      if (!ctx.user) {
        const newUser = new User({ name, email, password });
        const user = await newUser.save();
        return {
          token: jwt.sign(user.toJSON(), process.env.SECRET || "secretmoto"),
        };
      }
      throw new AuthenticationError("You are already logged in!");
    },
    login: async (
      _: any,
      { email, password }: UserLoginInputProp,
      ctx: ApolloContext
    ) => {
      if (!ctx.user) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User doesn't exist");
        const isMatch = user.password === password ? true : false;
        if (!isMatch) throw new Error("Password does not match");
        return {
          token: jwt.sign(user.toJSON(), process.env.SECRET || "secretmoto"),
        };
      }
      throw new AuthenticationError("You are already logged in!");
    },
  },
};
