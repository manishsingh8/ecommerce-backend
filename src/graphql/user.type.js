const userTypeDefs = `#graphql

type User {
  id: ID!
  name: String!
  email: String!
  role: String
}

type AuthResponse {
  token: String!
  user: User!
}

type Query {
  me: User
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthResponse
  signin(email: String!, password: String!): AuthResponse
}
`;

module.exports = userTypeDefs;
