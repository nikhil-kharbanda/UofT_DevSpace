import { gql } from '@apollo/client';

export const ADD_CHANNEL = gql`
mutation($channelName:String!){
    addChatroom(channelName:$channelName){
      channelName
    }
  }
`;

export const ADD_MSG = gql`
mutation newMessage($id:ID!,$messageData:ConversationInput!){
    newMessage(id:$id,messageData:$messageData){
      channelName
      conversation{
        message
        timestamp
        user{
          displayName
          email
          photo
          uid
        }
      }
    }
  }
`;