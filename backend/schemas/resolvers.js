const { ChatRoom } = require('../models')

const resolvers = {
    Query: {
        channels: async (parent, args, context)=>{
          try {
            const channels = await ChatRoom.find({});
            return channels
        } catch (error) {
            console.log(error)
        }    
      },
        conversation: async (parent, args) => {
          // Use the parameter to find the matching class in the collection
          return await ChatRoom.findById(args.id)
        },
    },
    Mutation: {
          addChatroom:async(parent,{channelName})=>{
            console.log(channelName)
            try{
              let newChatRoom= await ChatRoom.create({channelName:channelName})

              return newChatRoom
            }
            catch(err){
              console.log(err)
            }
          },
          newMessage: async(parent,{id, message})=>{
            console.log("new message started")
            let newMsg = ChatRoom.findByIdAndUpdate(
              { _id: id },
              { $push: { conversation: {message:message} } },
              { new: true }

          )
            return newMsg
          }
    }
}

module.exports = resolvers