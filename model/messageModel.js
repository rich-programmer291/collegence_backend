import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;