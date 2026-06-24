const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const userTypeDefs = require("./user.type");
const userResolvers = require("./resolvers/user.resolver");

const createGraphQLServer = async (app) => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

module.exports = createGraphQLServer;
