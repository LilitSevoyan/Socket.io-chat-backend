const mongoose = require("mongoose");

const MessengerSchema = new mongoose.Schema({
    conversationId:{type:String},
    sender:{type:String},
    text:{type:String}
    },
    { timestamps: true }
)
module.exports = mongoose.model("messenger",MessengerSchema);