const userTypeDefs = `#graphql

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

type Query {
    products: [Product!]!
}
`;

module.exports = productTypeDefs;