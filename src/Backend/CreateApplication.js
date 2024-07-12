const mongoose = require("mongoose");

const CreateApplication = new mongoose.Schema({
    applicantName: {
        type: String,
        required: true,
    },
    dateOfFiling: {
        type: Date,
        required: true,
        default: Date.now,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    creditAmount: {
        type: Number,
        required: true,
    },
    applicationStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    approvalDate: {
        type: Date,
    },
    issuingAuthority: {
        type: String,
    },
    remarks: {
        type: String,
    },
}, {
    timestamps: true,
});

mongoose.model("CreateApplication", CreateApplication);
