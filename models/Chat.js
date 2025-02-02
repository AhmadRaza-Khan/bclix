import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;
