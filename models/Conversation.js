import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminId: {
    type: String,
    default: new mongoose.Types.ObjectId("679ba0c05cf437805891a789"),
  },
}, { timestamps: true });

const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);
export default Conversation;
