import mongoose, { Schema } from "mongoose";

const RequestQuoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    projectCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadedFiles: [{
        url: {
            type: String
        },
        fileType: {
            type: String
        },
        filename: {
            type: String
        }
    }]

}, { timestamps: true });

const RequestQuote = mongoose.models.RequestQuote || mongoose.model("RequestQuote", RequestQuoteSchema);
export default RequestQuote;
