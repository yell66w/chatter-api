// import { AuthenticationError } from "apollo-server-express";
import { Request } from "express";
import jwt from "jsonwebtoken";

export const getUser = (req: Request) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.replace("Bearer ", "");
    const SECRET = process.env.SECRET || "secretmoto";
    try {
      const user = jwt.verify(token, SECRET);
      return user;
    } catch (error) {
      throw new Error("Authentication token is invalid");
    }
  }

  return null;
};
