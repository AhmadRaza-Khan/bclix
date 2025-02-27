import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    adminEmail: {
      type: String,
      required: true,
      trim: true,
      default: "bclixtech@gmail.com",
    },
    messages: [
      {
        senderEmail: { type: String, required: true, trim: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const UserConversation = mongoose.models.UserConversation || mongoose.model("UserConversation", ConversationSchema);
export default UserConversation;