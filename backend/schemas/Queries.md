The following query returns all Users 
```graphql
query getUsers {
  _id
  username
  email
  password
}
```
GET CHANNEL LIST: The following returns channelList ids and names
```graphql
query channels {
    _id
    channelName
}
```

GET DATA
```graphql
query {
 channels{
  _id
  channelName
  conversation{
    user {
      displayName
      email
      photo
      uid
        }
    message
    _id	
  	    }
    }
}
```
GET CONVERSATION BY CHANNEL ID
```graphql
query ($id:ID!){
 conversation(id: $id){
  _id
  channelName
  conversation{
    user{
      displayName
      email
      photo
      uid
    }
    message
    timestamp
    _id
  }
}
}
```