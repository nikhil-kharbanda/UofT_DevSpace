const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
    username: String!
    email: String!
    password: String
    }

    type Auth {
    token: ID!
    user: User
  }

    type Query {
    getUsers: [User]!
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs