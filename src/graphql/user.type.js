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

type OTPResponse {
  success: Boolean!
  message: String!
  requiresOTP: Boolean!
}

type Query {
  me: User
}
type MessageResponse {
  success: Boolean!
  message: String!
}

type Mutation {
  signup(
    name: String!
    email: String!
    password: String!
  ): AuthResponse

  signin(
    email: String!
    password: String!
  ): OTPResponse

  verifyLoginOTP(
    email: String!
    otp: String!
  ): AuthResponse

  resendLoginOTP(
    email: String!
  ): OTPResponse
}
`;

module.exports = userTypeDefs;
