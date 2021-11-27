const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
    username: String!
    email: String!
    password: String
    }

    type Conversation {
      message: String
      timestamp: String
      user: [User]
    }
    type ChatRoom {
      channelName: String
      conversation: Conversation
    }

    type Chat {
      chatName: String
      latestMessage: Message
      groupAdmin: User
    }

    type Message {
      sender: User!
      content: String
      chat: Chat
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