const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    identifier: {
        type: String
    },
    userType: {
        type: String,
        required: true,
        enum: ["Entity/Green Credit Applicant", "Implementing Agency"],
    },
    entityName: {
        type: String,
        required: true,
    },
    addressName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    entitytype: {
        type: String,
        required: true,
        enum: [
            "Government Institutions",
            "Public Sector Units",
            "Non-Government Organisations",
            "Private Companies",
            "Philanthropies",
            "Individuals",
            "Registered Group of Individuals",
        ],
    },
    aadhar: {
        type: String,
        required: true,
    },
    authperson: {
        type: String,
        required: true,
    },
    desig: {
        type: String,
        required: true,
    },
    connum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String, // URL or path to the uploaded image
    },
    agreeTerms: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

mongoose.model("UserInfo", UserSchema);