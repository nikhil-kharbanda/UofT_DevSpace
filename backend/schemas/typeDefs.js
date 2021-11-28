const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
    _id: ID
    uid: ID
    username: String!
    email: String
    password: String
    displayName: String
    photo: String
    }

    type Conversation {
      _id: ID
      message: String
      timestamp: String
      user: User
    }
    
    type ChatRoom {
      _id: ID
      channelName: String
      conversation: [Conversation]
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
    getUsers: [User]
    channels: [ChatRoom]
    conversation(id:ID!): Conversation
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs