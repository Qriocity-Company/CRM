const mongoose = require("mongoose");

const courseLeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: false,
        },
        profile: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const CourseLead = mongoose.model("CourseLead", courseLeadSchema);
module.exports = CourseLead;
