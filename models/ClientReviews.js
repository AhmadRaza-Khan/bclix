import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    client: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
