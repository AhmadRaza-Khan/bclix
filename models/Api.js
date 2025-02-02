import mongoose, { Schema } from "mongoose";

const APISchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    clients: {
        type: String,
        default: 1
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const API = mongoose.models.API || mongoose.model("API", APISchema);
export default API;
