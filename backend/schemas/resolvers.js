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
            try{
              let newChatRoom= await ChatRoom.create(channelName)

              return newChatRoom
            }
            catch(err){
              console.log(err)
            }
          },
          newMessage: async(parent,{chatId,message})=>{
            let newMsg = ChatRoom.update(
              { _id: chatId },
              { $push: { conversation: message } },
              (err, data) => {
                if (err) {
                    console.log('Error: Saving msg aborting');
                    console.log(err);
    
                    res.status(500).send(err);
                } else {
                    res.status(201).send(data)
                }
            }
          )
            return newMsg
          }
    }
}

module.exports = resolvers