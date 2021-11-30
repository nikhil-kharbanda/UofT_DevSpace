const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type Conversation {
      message: String
      timestamp: String
      user: User
      _id:ID
    }

    type User{
      displayName: String
      email: String
      photo: String
      uid: String
    }
    
    type ChatRoom {
      _id: ID
      channelName: String
      conversation: [Conversation]
    }


    input ConversationInput{
      message: String
      timestamp: String
      user:UserInput
    }

    input UserInput{
      displayName: String
      email: String
      photo: String
      uid: String
    }

    type Query {
    channels: [ChatRoom]
    conversation(_id:ID!): ChatRoom
    }

    type Mutation {
      addChatroom(channelName:String!):ChatRoom
      newMessage(id:ID!, messageData:ConversationInput!):ChatRoom
    }
`;

module.exports = typeDefs