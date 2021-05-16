const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = (context) => {
  if (context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, env.secret_key, (err, data) => {
      if (err) {
        return;
        // throw new AuthenticationError("Unauthticated Access!");
      }
      context.user = data;
    });
  }
  return context;
};
