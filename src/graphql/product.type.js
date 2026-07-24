const productTypeDefs = `#graphql

type Product {
  id: ID!
  title: String!
  description: String!
  image: String!
  price: Float!
  category: String!
  stock: Int!
  rating: Float!
}

type ProductPagination {
  products: [Product!]!
  totalProducts: Int!
  totalPages: Int!
  currentPage: Int!
}

extend type Query {
  products(page: Int!, limit: Int!): ProductPagination!
}
`;

module.exports = productTypeDefs;