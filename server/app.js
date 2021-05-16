const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./models");

// The GraphQL schema
const typeDefs = require("./graphql/typeDefs");
// The GraphQL resolvers
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Db Connected`);
    })
    .catch((err) => {
      console.log(err);
    });
});
