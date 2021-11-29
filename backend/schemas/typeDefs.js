const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type Conversation {
      message: String
      timestamp: String
      user: String
      _id:ID
    }
    
    type ChatRoom {
      _id: ID
      channelName: String
      conversation: [Conversation]
    }

    type Query {
    channels: [ChatRoom]
    conversation(id:ID!): ChatRoom
    }

    type Mutation {
      addChatroom(channelName:String!):ChatRoom
      newMessage(id:ID!, message:String!):ChatRoom
    }
`;

module.exports = typeDefs