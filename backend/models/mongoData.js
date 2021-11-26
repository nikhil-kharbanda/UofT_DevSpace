// import mongoose from 'mongoose'
const mongoose = require('mongoose')

const chatroomSchema = mongoose.Schema({
    channelName: String,
    conversation: [
        {
            message: String,
            timestamp: String,
            user: {
                displayName: String,
                email: String,
                photo: String,
                uid: String
            }
        }
    ]
})

// export default mongoose.model('messages', chatroomSchema)

const chatRoom = mongoose.model("message", chatroomSchema);

module.exports = chatRoom;

