import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema({
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
    file: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
export default Testimonial;
