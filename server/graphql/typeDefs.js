const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
    createdAt: String!
  }
  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
  }

  type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;
