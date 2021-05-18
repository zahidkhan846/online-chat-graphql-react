const messages = require("./messages");
const users = require("./users");

module.exports = {
  Message: {
    createdAt: (parant) => parant.createdAt.toISOString(),
  },
  User: {
    createdAt: (parant) => parant.createdAt.toISOString(),
  },
  Query: {
    ...users.Query,
    ...messages.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...messages.Mutation,
  },
};
