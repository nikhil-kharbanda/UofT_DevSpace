const { User, ChatRoom } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
        getUsers: async (parent, args, context) => {
            try {
                const users = await User.find()
                return users
            } catch (error) {
                console.log(error)
            }    
        },
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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('No user found with this username address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
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