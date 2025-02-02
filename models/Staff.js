import mongoose, { Schema } from "mongoose";

const StaffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
export default Staff;
