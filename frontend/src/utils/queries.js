import { gql } from '@apollo/client';

export const QUERY_CHANNEL = gql`
query {
    channels {
        _id
        channelName
    }
}
`;

export const CONVO_MSGS = gql`
query conversation ($id:ID!){
	conversation(_id:$id){
    _id
    channelName
    conversation{
        _id
      message
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

