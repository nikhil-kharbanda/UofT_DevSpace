const mongoose = require('mongoose')

const conversation = mongoose.Schema(
    {
        chatName:{type: String, trim: true},
        message:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }],
        timestamp: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Conversation = mongoose.model("Conversation", conversation);

module.exports = Conversation;