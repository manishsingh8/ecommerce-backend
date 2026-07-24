const Product = require("../../models/Product");

const productResolver = {
  Query: {
    products: async (_, { page, limit }) => {
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

    return {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
     };
    },
  },
};

module.exports = productResolver;