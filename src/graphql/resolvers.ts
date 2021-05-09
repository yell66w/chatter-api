import { dateScalar } from "./custom/date.scalar";
import messages from "./messages";
import users from "./users";

export default [
  {
    Date: dateScalar,
  },
  users.resolvers,
  messages.resolvers,
];
