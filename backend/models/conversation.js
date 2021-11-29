const mongoose = require('mongoose')

const conversation = mongoose.Schema(
    {
        message:{
            type: String
        },
        timestamp: {
            type: String
        },
        user: {
            displayName: String,
            email: String,
            photo: String,
            uid: String
        }
    },
);

const Conversation = mongoose.model("Conversation", conversation);

module.exports = Conversation;