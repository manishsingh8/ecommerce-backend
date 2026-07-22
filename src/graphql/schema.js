const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const userTypeDefs = require("./user.type");
const productTypeDefs = require("./product.type");
const userResolvers = require("./resolvers/user.resolver");
const productResolvers = require("./resolvers/product.resolver");
const auth = require("../middleware/auth");

const createGraphQLServer = async (app) => {
  const server = new ApolloServer({
    typeDefs: [
      userTypeDefs,
      productTypeDefs,
    ],
    resolvers: [
      userResolvers,
      productResolvers,
    ],
  });

  await server.start();

 app.use(
  "/graphql",
  expressMiddleware(server, {
    context: auth,
  }),
);
};

module.exports = createGraphQLServer;