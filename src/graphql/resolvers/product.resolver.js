const Product = require("../../models/Product");

const productResolver = {
  Query: {
    products: async (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return await Product.find();
    },
  },
};

module.exports = productResolver;