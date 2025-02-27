import mongoose, { Schema } from "mongoose";

const QuoteSchema = new Schema(
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
        senderEmail: { type: String, trim: true },
        message: { type: String, required: false },
        timestamp: { type: Date, default: Date.now },
        files: [
          {
            url: { type: String, required: true },
            filename: { type: String, required: true },
            fileType: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
export default Quote;
