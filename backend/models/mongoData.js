import mongoose from 'mongoose'

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

export default mongoose.model('messages', chatroomSchema)