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
      message: String
      timestamp: String
      user: User
      _id:ID
    }
    
    type ChatRoom {
      _id: ID
      channelName: String
      conversation: [Conversation]
    }

    type Auth {
    token: ID!
    user: User
  }

    type Query {
    getUsers: [User]
    channels: [ChatRoom]
    conversation(id:ID!): ChatRoom
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(username: String!, password: String!): Auth
      addChatroom(chatName:String!):ChatRoom
    }
`;

module.exports = typeDefs